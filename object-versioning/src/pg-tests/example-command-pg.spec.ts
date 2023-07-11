import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleCommand } from "../example-command";
import { RecordModels, SubscribeModels } from "../../models";
import { ExampleTestStack } from "../types";
import { ExampleStateListener } from "../example-state-listener";
import { catchAllErrorHandler } from "shimmiestack";
import { StreamVersionError } from "shimmiestack/event";
import EventBase from "shimmiestack/eventbase-postgres";

const pgEventBase = EventBase({
    connectionString: 'postgres://object-versioning:object-versioning@127.0.0.1:5555/object-versioning'
})

beforeAll(async () => {
    await pgEventBase.init()
})
/** Create an event base using a local postgres */
let testStack: ExampleTestStack = ShimmieTestStack<RecordModels, SubscribeModels>(
    undefined,
    true,
    pgEventBase
)

const stateListener = ExampleStateListener(testStack)
const exampleCommand = ExampleCommand(testStack, stateListener)

testStack.mountTest(exampleCommand)
const versonErrorResp = {error: "Your data is out of date, please refresh and try again"}

testStack.use((err:any,req:any,res:any,next:any) => {
    if(err instanceof StreamVersionError){
        return res.status(409).json(versonErrorResp)
    }

    return catchAllErrorHandler(err,req, res,next)
})


describe("ExampleCommand", () => {
    beforeEach(async () => {
        jest.clearAllMocks()
        stateListener.reset()
        await testStack.restart()
    })
    it('Should add an event each time it is called', async () => {
        await testStack.testPost({
            path: '/',
            expectedResponseCode: 204,
        })

        await testStack.testPost({
            path: '/',
            expectedResponseCode: 204,
        })

        await testStack.testPost({
            path: '/',
            expectedResponseCode: 204,
        })

        expect(testStack.recordUncheckedEvent).toHaveBeenCalledWith(
            {
                streamId: 'exampleStreamId',
                eventName: 'EXAMPLE_EVENT',
                eventData: expect.anything(),
                meta: expect.anything(),
            }
        )

        expect(testStack.recordUncheckedEvent).toHaveBeenCalledTimes(3)

    })

    describe('with object version checking', () => {

        it('Should add an event each time it is called', async () => {
            await testStack.testPost({
                path: '/checked',
                expectedResponseCode: 204,
            })

            await testStack.testPost({
                path: '/checked',
                expectedResponseCode: 204,
            })

            await testStack.testPost({
                path: '/checked',
                expectedResponseCode: 204,
            })

            expect(testStack.recordEvent).toHaveBeenCalledWith(
                {
                    streamId: 'exampleStreamId',
                    eventName: 'EXAMPLE_EVENT',
                    eventData: expect.anything(),
                    meta: expect.anything(),
                    streamVersionIds: {exampleStreamId: expect.anything()}
                }
            )

            expect(testStack.recordEvent).toHaveBeenCalledTimes(3)
            expect(stateListener.getTimeStamps()).toHaveLength(3)

        })

        it('Should fail when the version changes since you fetched data from the stateListener', async () => {
            // put 1 event in the db
            await testStack.testPost({
                path: '/checked',
                expectedResponseCode: 204,
            })

            expect(stateListener.getTimeStamps()).toHaveLength(1)

            //mock the stateListener lookup so it mimics the state changing in another process/thread/deployment
            const originalFunc = stateListener.getTimeStamps
            stateListener.getTimeStamps = jest.fn(() => {
                // get the state
                const currentState = originalFunc()

                // mutate state, so subsequent calls to getTimestamp get different values for max version
                stateListener.addTimestamp(
                    {
                        data: {
                            timeStamp: new Date().toISOString()
                        },
                        streamVersionId: (Math.random() + 1).toString(36).substring(2)
                    }
                )

                return currentState
            })

            // try add a second. this should fail as we are acting on outdated info.
            const resp = await testStack.testPost({
                path: '/checked',
                expectedResponseCode: 409,
            })

            expect(resp.body).toEqual(versonErrorResp)
            expect(testStack.recordEvent).toHaveBeenCalledTimes(2)

        })
    })
})