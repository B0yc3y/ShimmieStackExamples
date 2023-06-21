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
    beforeEach(async () => {
        // setup some events
        stateListener.getTimeStamps = jest.fn(() => mockTimestampObject)
    })
    it('Should add an event each time it is called', async () => {

        const response = await testStack.testGet({
            path: '/',
            expectedResponseCode: 200
        })

        expect(response.body).toBeDefined()
        expect(response.body).toEqual(mockTimestampObject)

    })
})