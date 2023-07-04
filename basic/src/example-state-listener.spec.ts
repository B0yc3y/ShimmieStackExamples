import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleStateListener, ExampleStateListenerType } from "./example-state-listener";

const testStack = ShimmieTestStack()
const stateListener: ExampleStateListenerType = ExampleStateListener(testStack)

describe("ExampleStateListener", () => {
    beforeEach(() => stateListener.reset())
    it('Should add an event each time it is called', async () => {

        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()

        await testStack.recordUnversionedEvent({
            streamId: 'exampleStreamId',
            eventName: 'EXAMPLE_EVENT',
            eventData: {
                timeStamp
            },
            meta: {
                userAgent: 'exampleAgent',
                user: 'exampleUser',
                date: dateNow.getDate()
            }
        })

        expect(stateListener.getTimeStamps()[0]).toBeDefined()
        expect(stateListener.getTimeStamps()[0]).toEqual({
            timeStamp
        })
    })
})