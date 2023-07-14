import { ShimmieTypedEvent } from "shimmiestack";
import { SubscribeModels } from "../models";
import { ExampleStack } from "./types";

export type ExampleState = {
    timeStamps: VersionedExampleTimestamp[]
}

export type ExampleTimestamp = { timeStamp: string }

export type VersionedObject = {
    streamVersionId: string
}

export type VersionedExampleTimestamp = VersionedObject & {
    data: ExampleTimestamp
}

export type ExampleStateListenerType = {
    getTimeStamps: () => VersionedExampleTimestamp[]
    addTimestamp: (ts: VersionedExampleTimestamp) => void
    reset: () => void
}

export const ExampleStateListener = (
    stack: ExampleStack
): ExampleStateListenerType => {
    // Here is a listener that can just consume events from the event stream.
    const exampleState: ExampleState = {
        timeStamps: []
    }
    // on every EXAMPLE_EVENT emitted, push the data into exampleEvent.timestamps
    stack.subscribe(
        'EXAMPLE_EVENT',
        (event: ShimmieTypedEvent<'EXAMPLE_EVENT', SubscribeModels['EXAMPLE_EVENT']>) => {
            console.log("Handling event")
            exampleState.timeStamps.push(
                {
                    data: event.data,
                    streamVersionId: event.streamVersionId
                }
            )
    })

    // return some methods that expose the state
    return {
        getTimeStamps: () => {
            return exampleState.timeStamps
        },
        addTimestamp: (ts: VersionedExampleTimestamp) => {
            exampleState.timeStamps.push(ts)
        },
        reset: () => {
            exampleState.timeStamps = []
        }
    }
}