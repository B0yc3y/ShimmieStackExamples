import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleQuery } from "./example-query";
import { ExampleStateListener, ExampleStateListenerType } from "./example-state-listener";

const testStack = ShimmieTestStack()
const stateListener: ExampleStateListenerType = ExampleStateListener(testStack)
const exampleQuery = ExampleQuery(stateListener)

const mockTimestampObject = [{
    timeStamp: new Date().toISOString()
}]
stateListener.getTimeStamps = jest.fn()

testStack.mountTest(exampleQuery)
describe("ExampleQuery", () => {
    it('Should add an event each time it is called', async () => {

        testStack.recordEvent()

        expect(response.body).toBeDefined()
        expect(response.body).toEqual(mockTimestampObject)

    })
})