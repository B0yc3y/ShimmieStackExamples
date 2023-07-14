import { Router, StackType } from "shimmiestack";
import { Song } from "./types";

export function SongCommand(
    stack: StackType,
): Router {
    const router = Router()

    // when receiving a post to /example, write an event with a timestamp.
    router.post(
        '/',
        async (req, res) => {
            const dateNow = new Date()
            const timeStamp = dateNow.toISOString()
            console.log(`Request received at: ${timeStamp}`)

            const song: Song = req.body

            // record a new song created event without checking versions
            // It is fine to not check versions when we are only running a single thread/process
            // or when we want this action to happen regardless of any potential state changes we may have missed
            await stack.recordUncheckedEvent({
                streamId: 'exampleStreamId',
                eventName: 'SONG_CREATED_EVENT',
                eventData: song,
                meta: {
                    userAgent: 'exampleAgent',
                    user: 'exampleUser',
                    date: dateNow.getDate()
                }
            })

            res.sendStatus(201)
        }
    )


    return router
}