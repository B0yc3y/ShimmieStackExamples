import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { ExampleStateListener, ExampleStateListenerType } from "./example-state-listener";
import { ExampleTestStack } from "./types";
import { RecordModels, SubscribeModels } from "../models";

const testStack: ExampleTestStack = ShimmieTestStack<RecordModels, SubscribeModels>(undefined, true)
const stateListener: ExampleStateListenerType = ExampleStateListener(testStack)

describe("ExampleStateListener", () => {
    beforeEach(() => stateListener.reset())
    it('Should add an event each time it is called', async () => {

        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()
        const payload = {
            timeStamp,
            callerName: 'bobby'
        }
        await testStack.recordEvent(
            'exampleStreamId',
            'EXAMPLE_EVENT',
            payload,
            {
                userAgent: 'exampleAgent',
                user: 'exampleUser',
                date: dateNow.getDate()
            },
            ['callerName']
        )

        expect(stateListener.getTimeStamps()[0]).toBeDefined()
        expect(stateListener.getTimeStamps()[0]).toEqual(payload)
    })
})