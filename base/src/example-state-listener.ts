import { ShimmieTypedEvent, StackType } from "shimmiestack";

export type ExampleState = {
    timeStamps: {
        timeStamp: string
    }[]
}

export type ExampleTimestamp = { timeStamp: string }

export type ExampleStateListenerType = {
    getTimeStamps: () => ExampleTimestamp[]
    reset: () => void
}

export const ExampleStateListener = <T extends StackType>(
    stack: T
): ExampleStateListenerType => {
    // Here is a listener that can just consume events from the event stream.
    const exampleState: ExampleState = {
        timeStamps: []
    }
    // on every EXAMPLE_EVENT emitted, push the data into exampleEvent.timestamps
    stack.subscribe('EXAMPLE_EVENT', (event: ShimmieTypedEvent<'EXAMPLE_EVENT', any>) => {
        console.log("Handling event")
        exampleState.timeStamps.push(event.data)
    })

    // return some methods that expose the state
    return {
        getTimeStamps: () => {
            return exampleState.timeStamps
        },
        reset: () => {
            exampleState.timeStamps = []
        }
    }
}