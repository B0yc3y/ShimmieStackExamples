import { Router } from "shimmiestack";
import { ExampleStateListenerType } from "./example-state-listener";
import { noAuthorization } from "shimmiestack/authorizers";

export function ExampleQuery(
    stateListener: ExampleStateListenerType
): Router {
    const router = Router()

    // when receiving a post to /example, respond with the timestamp data
    router.get(
        '/',
        noAuthorization, // you must explicitly call no authorisation to make an API available without auth.
        async (req, res) => {
            res.status(200).json(stateListener.getTimeStamps())
        }
    )


    return router
}