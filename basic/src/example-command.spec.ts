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

        expect(testStack.recordEvent).toHaveBeenCalledWith(
            'exampleStreamId',
            'EXAMPLE_EVENT',
            expect.anything(),
            expect.anything()
        )

        expect(testStack.recordEvent).toHaveBeenCalledTimes(3)

    })
})