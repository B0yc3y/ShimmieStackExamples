import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleStateListener, ExampleStateListenerType } from "./example-state-listener";
import { ExampleTestStack } from "./types";
import { RecordModels, SubscribeModels } from "../models";

const testStack: ExampleTestStack = ShimmieTestStack<RecordModels, SubscribeModels>(undefined, true)
const stateListener: ExampleStateListenerType = ExampleStateListener(testStack)
const UUIDV4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

describe("ExampleStateListener", () => {
    beforeEach(() => stateListener.reset())
    it('Should add an event each time it is called', async () => {

        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()
        const payload = {
            timeStamp,
            callerName: 'bobby'
        }
        await testStack.recordUncheckedEvent(
            {
                streamId: 'exampleStreamId',
                eventName: 'EXAMPLE_EVENT',
                eventData: payload,
                meta: {
                    userAgent: 'exampleAgent',
                    user: 'exampleUser',
                    date: dateNow.getDate()
                },
                piiFields: ['callerName']
            }
        )


        expect(stateListener.getTimeStamps()[0]).toBeDefined()
        expect(stateListener.getTimeStamps()[0]).toEqual({
            data:payload,
            streamVersionId: expect.stringMatching(UUIDV4_REGEX)
        })
    })
})