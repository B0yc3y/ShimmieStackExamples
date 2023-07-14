import ShimmieTestStack from "shimmiestack/shimmieteststack";
import { SongCommand } from "./song-command";


const testStack = ShimmieTestStack()
const exampleCommand = SongCommand(testStack)

testStack.mountTest(exampleCommand)

describe("ExampleCommand", () => {
    it('Should add an event each time it is called', async () => {
        await testStack.testPost({
            path: '/',
            body: {
                artist: 'Elvis',
                year: '1952',
                title: 'Hound Dog'
            },
            expectedResponseCode: 201,
        })

        await testStack.testPost({
            path: '/',
            body: {
                artist: 'Elvis',
                year: '1956',
                title: 'Love Me Tender'
            },
            expectedResponseCode: 201,
        })

        await testStack.testPost({
            path: '/',
            body: {
                artist: 'Elvis',
                year: '1964',
                title: 'Viva Las Vegas'
            },
            expectedResponseCode: 201,
        })

        expect(testStack.recordUncheckedEvent).toHaveBeenCalledWith({
            streamId: 'exampleStreamId',
            eventName: 'SONG_CREATED_EVENT',
            eventData: expect.anything(),
            meta: expect.anything()
        })

        expect(testStack.recordUncheckedEvent).toHaveBeenCalledTimes(3)

    })
})