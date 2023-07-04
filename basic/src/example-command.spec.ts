import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleCommand } from "./example-command";


const testStack = ShimmieTestStack()
const exampleCommand = ExampleCommand(testStack)

testStack.mountTest(exampleCommand)

describe("ExampleCommand", () => {
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

        expect(testStack.recordUnversionedEvent).toHaveBeenCalledWith({
            streamId: 'exampleStreamId',
            eventName: 'EXAMPLE_EVENT',
            eventData: expect.anything(),
            meta: expect.anything()
        })

        expect(testStack.recordUnversionedEvent).toHaveBeenCalledTimes(3)

    })
})