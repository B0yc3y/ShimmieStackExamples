import EventBase from 'shimmiestack/eventbase-memory'
import ShimmieStack, { catchAllErrorHandler, ShimmieConfig, } from 'shimmiestack'
import { authorizeApi, noAuthorization } from 'shimmiestack/authorizers'
import { ExampleCommand } from "./example-command";
import { ExampleQuery } from "./example-query";
import { ExampleStateListener } from "./example-state-listener";

// Create an ephemeral in memory event base
const eventBase = EventBase()

const config: ShimmieConfig = {
    ServerPort: 8080,
    CORS: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
    enforceAuthorization: false,
}

// define the stack
const stack = ShimmieStack(
    config,
    eventBase,
    authorizeApi(noAuthorization), // Currently unused, API to be updated.
)

// prepare your stateful listeners
const exampleStateListener = ExampleStateListener(stack)

// prepare the stack
stack
    .setApiVersion('/v1')
    .setErrorHandler(catchAllErrorHandler) // optionally set a custom error handler. Defaulted to "catchAllErrorHandler" if not provided.
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

