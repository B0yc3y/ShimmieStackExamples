import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { SongStateListener, SongStateListenerType } from "./song-state-listener";
import { Song } from "./types";

const testStack = ShimmieTestStack()
const stateListener: SongStateListenerType = SongStateListener(testStack)

describe("ExampleStateListener", () => {
    beforeEach(() => stateListener.reset())
    it('Should add an event each time it is called', async () => {

        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()

        const song: Song = {
            artist: 'Elvis',
            year: '1952',
            title: 'Hound Dog'
        }

        await testStack.recordUncheckedEvent({
            streamId: 'exampleStreamId',
            eventName: 'SONG_CREATED_EVENT',
            eventData: song,
            meta: {
                userAgent: 'exampleAgent',
                user: 'exampleUser',
                date: dateNow.getDate()
            }
        })

        expect(stateListener.getSongs()[0]).toBeDefined()
        expect(stateListener.getSongs()[0]).toEqual(song)
    })
})