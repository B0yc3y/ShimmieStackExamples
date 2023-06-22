// We are defining the mapping between event names and their payloads in these models.
// We define an ExampleStack type here for reuse in the project.
import { StackType } from "shimmiestack";
import { RecordModels, SubscribeModels } from "../models";
import { ShimmieTestStackType } from "shimmiestack/shimmieteststack";

export type ExampleStack = StackType<RecordModels, SubscribeModels>
export type ExampleTestStack = ShimmieTestStackType<RecordModels, SubscribeModels>