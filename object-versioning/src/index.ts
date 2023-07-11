import 'express-async-errors'
import EventBase from 'shimmiestack/eventbase-memory'
import ShimmieStack from 'shimmiestack'
import { authorizeApi, noAuthorization } from 'shimmiestack/authorizers'
import { ExampleCommand } from "./example-command";
import { ExampleQuery } from "./example-query";
import { ExampleStateListener } from "./example-state-listener";
import { RecordModels, SubscribeModels } from "../models";
import { ExampleStack } from "./types";
import { Logger } from "./logger";
import { ExampleConfig } from "./config";

// Create an ephemeral in memory event base
const eventBase = EventBase()

// define the stack
const stack: ExampleStack = ShimmieStack<RecordModels, SubscribeModels>(
    ExampleConfig,
    eventBase,
    authorizeApi(noAuthorization), // Currently unused, API to be updated.
    undefined,
    Logger // shimmiestack will use the provided logger to log its internals.
)

// prepare your stateful listeners
const exampleStateListener = ExampleStateListener(stack)

// prepare the stack
stack
    .setApiVersion('/v1')
    .mountProcessor(
        'Example Command',
        '/example',
        ExampleCommand(stack, exampleStateListener)
    )
    .mountProcessor(
        'Example Query',
        '/example',
        ExampleQuery(exampleStateListener)
    )
    .startup()

