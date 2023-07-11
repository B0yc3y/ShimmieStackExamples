// What payloads are associated when what event types when recording and subscribing to events?
// If I try record and event of type "EXAMPLE_EVENT" and my payload does not match { timeStamps: string }
// I will get a type error
import { ExampleTimestamp } from "./src/example-state-listener";

export type RecordModels = {
    EXAMPLE_EVENT: ExampleTimestamp
}

export type SubscribeModels = RecordModels