import EventBase from 'shimmiestack/eventbase-memory'
import ShimmieStack, { ShimmieConfig, } from 'shimmiestack'
import { authorizeApi, noAuthorization } from 'shimmiestack/authorizers'
import { ExampleCommand } from "./example-command";
import { ExampleQuery } from "./example-query";
import { ExampleStateListener } from "./example-state-listener";
import { RecordModels, SubscribeModels } from "../models";
import { ExampleStack } from "./types";
import { authenticationMiddleware } from "./auth-handlers";
import PiiBase from "shimmiestack/piibase-memory";
import { Logger } from "./logger";
import { CustomErrorHandler } from "./error-handler";

// Create an ephemeral in memory event base
const eventBase = EventBase()
const piiBase = PiiBase()

const config: ShimmieConfig = {
    ServerPort: 8080,
    CORS: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
    enforceAuthorization: true,
}

// define the stack
const stack: ExampleStack = ShimmieStack<RecordModels, SubscribeModels>(
    config,
    eventBase,
    authorizeApi(noAuthorization), // Currently unused, API to be updated.
    piiBase,
    Logger // shimmiestack will use the provided logger to log its internals.
)

// set up authentication on the apis
stack.use(authenticationMiddleware)

// prepare your stateful listeners
const exampleStateListener = ExampleStateListener(stack)

// prepare the stack
stack
    .setApiVersion('/v1')
    .setErrorHandler(CustomErrorHandler) // set a custom error handler
    .mountProcessor(
        'Example Command',
        '/example',
        ExampleCommand(stack)
    )
    .mountProcessor(
        'Example Query',
        '/example',
        ExampleQuery(exampleStateListener)
    )
    .registerPreInitFn(() => {
        console.log("An anonymous function that runs before events are replayed")
    })
    .registerPostInitFn(() => {
        console.log("An anonymous function that runs after events are replayed")
    })
    .startup()

