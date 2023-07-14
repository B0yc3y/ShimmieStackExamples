import { ShimmieEvent, ShimmieTypedEvent, StackType } from "shimmiestack";
import { Song } from "./types";

export type SongState = {
    songs: Song[]
}

export type SongStateListenerType = {
    getSongs: () => Song[]
    reset: () => void
}

export const SongStateListener = <T extends StackType>(
    stack: T
): SongStateListenerType => {
    // Here is a listener that can just consume events from the event stream.
    const songState: SongState = {
        songs: []
    }

    // on every SONG_CREATED_EVENT emitted, push the data into exampleEvent.songs
    stack.subscribe('SONG_CREATED_EVENT', (event: ShimmieTypedEvent<'SONG_CREATED_EVENT', Song>) => {
        console.log("Handling event")
        songState.songs.push(event.data)
    })

    // return some methods that expose the state
    return {
        getSongs: () => {
            return songState.songs
        },
        reset: () => {
            songState.songs = []
        }
    }
}