import { Router, StackType } from "shimmiestack";

export function ExampleCommand(
    stack: StackType,
): Router {
    const router = Router()

    // when receiving a post to /example, write an event with a timestamp.
    router.post('/', async (req, res) => {
        const dateNow = new Date()
        const timeStamp = dateNow.toISOString()
        console.log(`Request received at: ${timeStamp}`)

        await stack.recordUncheckedEvent({
            streamId: 'exampleStreamId',
            eventName: 'EXAMPLE_EVENT',
            eventData: {
                timeStamp,
                callerName: 'tommy'
            },
            meta: {
                userAgent: 'exampleAgent',
                user: 'exampleUser',
                date: dateNow.getDate()
            }
        })

        res.sendStatus(204)
        }
    )


    return router
}