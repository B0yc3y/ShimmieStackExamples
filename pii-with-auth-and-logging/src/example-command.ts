import { Router } from "shimmiestack";
import { ExampleStack } from "./types";
import { authorizeExampleAccessRequest } from "./auth-handlers";

export function ExampleCommand(
    stack: ExampleStack,
): Router {
    const router = Router()

    // when receiving a post to /example, write an event with a timestamp.
    router.post(
        '/',
        // this function is used to authorize this request before the handler code below is called.
        authorizeExampleAccessRequest,
        async (req, res) => {

            const dateNow = new Date()
            const timeStamp = dateNow.toISOString()
            console.log(`Request received at: ${timeStamp}`)

            await stack.recordUnversionedEvent({
                streamId: 'exampleStreamId',
                eventName: 'EXAMPLE_EVENT',
                eventData: {
                    timeStamp,
                    callerName: res.locals.user.name
                },
                meta: {userAgent: 'exampleAgent', user: 'exampleUser', date: dateNow.getDate()},
                piiFields: ['callerName'] // this tells the stack to store the callerName in the piiBase instead of the event base.
            })
            return res.sendStatus(204)
        }
    )


    return router
}