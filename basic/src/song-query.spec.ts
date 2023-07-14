import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { SongQuery } from "./song-query";
import { SongStateListener, SongStateListenerType } from "./song-state-listener";
import { Song } from "./types";

const testStack = ShimmieTestStack()
const stateListener: SongStateListenerType = SongStateListener(testStack)
const exampleQuery = SongQuery(stateListener)

const mockSongState: Song[] = [
    {
        artist: 'Elvis',
        year: '1952',
        title: 'Hound Dog'
    }
]
stateListener.getSongs = jest.fn()

testStack.mountTest(exampleQuery)
describe("SongQuery", () => {
    beforeEach(async () => {
        // setup some events
        stateListener.getSongs = jest.fn(() => mockSongState)
    })
    it('Should add an event each time it is called', async () => {

        const response = await testStack.testGet({
            path: '/',
            expectedResponseCode: 200
        })

        expect(response.body).toBeDefined()
        expect(response.body).toEqual(mockSongState)

    })
})