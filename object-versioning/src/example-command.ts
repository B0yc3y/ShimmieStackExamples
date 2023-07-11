import { Router } from "shimmiestack";
import { ExampleStack } from "./types";
import { ExampleStateListenerType } from "./example-state-listener";
export function ExampleCommand(
    stack: ExampleStack,
    stateListener: ExampleStateListenerType
): Router {
    const router = Router()

    // when receiving a post to /example, write an event with a timestamp.
    router.post(
        '/',
        // this function is used to authorize this request before the handler code below is called.
        async (req, res) => {

            const dateNow = new Date()
            const timeStamp = dateNow.toISOString()
            console.log(`Request received at: ${timeStamp}`)

            await stack.recordUnversionedEvent({
                streamId: 'exampleStreamId',
                eventName: 'EXAMPLE_EVENT',
                eventData: {
                    timeStamp
                },
                meta: {userAgent: 'exampleAgent', user: 'exampleUser', date: dateNow.getDate()},
            })
            return res.sendStatus(204)
        }
    )

    // when receiving a post to /example, write an event with a timestamp.
    router.post(
        '/version-checked',
        // this function is used to authorize this request before the handler code below is called.
        async (req, res) => {

            const dateNow = new Date()
            const timeStamp = dateNow.toISOString()

            const timeStamps = stateListener.getTimeStamps()
            const streamVersionId = timeStamps.length ? timeStamps[timeStamps.length - 1].streamVersionId : undefined

            await stack.recordEvent({
                streamId: 'exampleStreamId',
                eventName: 'EXAMPLE_EVENT',
                eventData: {
                    timeStamp
                },
                streamVersionIds: { exampleStreamId: streamVersionId },
                meta: {userAgent: 'exampleAgent', user: 'exampleUser', date: dateNow.getDate()},
            })

            return res.sendStatus(204)
        }
    )


    return router
}