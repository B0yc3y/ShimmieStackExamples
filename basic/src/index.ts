import EventBase from 'shimmiestack/eventbase-memory'
import ShimmieStack, { ShimmieConfig, } from 'shimmiestack'
import { authorizeApi, noAuthorization } from 'shimmiestack/authorizers'
import { SongCommand } from "./song-command";
import { SongQuery } from "./song-query";
import { SongStateListener } from "./song-state-listener";

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
const songStack = ShimmieStack(
    config,
    eventBase,
    authorizeApi(noAuthorization), // Currently unused, API to be updated.
)

// prepare your stateful listeners
const songStateListener = SongStateListener(songStack)

// prepare the stack
songStack
    .setApiVersion('/v1')
    .mountProcessor(
        'Song Command',
        '/songs',
        SongCommand(songStack)
    )
    .mountProcessor(
        'Song Query',
        '/songs',
        SongQuery(songStateListener)
    )
    .registerPreInitFn(() => {
        console.log("An anonymous function that runs before events are replayed")
    })
    .registerPostInitFn(() => {
        console.log("An anonymous function that runs after events are replayed")
    })
    .startup()

