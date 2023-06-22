import ShimmieTestStack, { TestRequestHeaders } from "shimmiestack/shimmieteststack";
import { ExampleCommand } from "./example-command";
import { RecordModels, SubscribeModels } from "../models";
import { ExampleTestStack } from "./types";
import { authenticationMiddleware } from "./auth-handlers";


const testStack: ExampleTestStack = ShimmieTestStack<RecordModels, SubscribeModels>(undefined, true)
const exampleCommand = ExampleCommand(testStack)
testStack.use(authenticationMiddleware)
testStack.mountTest(exampleCommand)
const emptyHeaders = {} as TestRequestHeaders // typescript makes sure we have auth.
const bobbyHeaders = {
    'Authorization': 'bobbysInsecureToken'
}
const notBobbyHeaders = {
    'Authorization': 'notBobbysInsecureToken'
}


describe("ExampleCommand", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("with auth", () => {
        it('Should add an event each time it is called', async () => {
            await testStack.testPost({
                path: '/',
                headers: bobbyHeaders,
                expectedResponseCode: 204,
            })

            await testStack.testPost({
                path: '/',
                headers: bobbyHeaders,
                expectedResponseCode: 204,
            })

            await testStack.testPost({
                path: '/',
                headers: bobbyHeaders,
                expectedResponseCode: 204,
            })

            expect(testStack.recordEvent).toHaveBeenCalledWith(
                'exampleStreamId',
                'EXAMPLE_EVENT',
                expect.anything(),
                expect.anything(),
                ["callerName"]
            )

            expect(testStack.recordEvent).toHaveBeenCalledTimes(3)

        })
    })
    describe("without auth", () => {
        it('Should reject a request when no auth header provided', async () => {
            await testStack.testPost({
                path: '/',
                headers: emptyHeaders,
                expectedResponseCode: 401,
            })

            expect(testStack.recordEvent).not.toHaveBeenCalled()
        })

        it('Should reject a request when incorrect auth header provided', async () => {
            await testStack.testPost({
                path: '/',
                headers: {
                    'Authorization': ''
                },
                expectedResponseCode: 401,
            })

            expect(testStack.recordEvent).not.toHaveBeenCalled()
        })

        it('Should reject a request when an unauthorised user tries to call', async () => {
            await testStack.testPost({
                path: '/',
                headers: notBobbyHeaders,
                expectedResponseCode: 403,
            })

            expect(testStack.recordEvent).not.toHaveBeenCalled()
        })
    })
})