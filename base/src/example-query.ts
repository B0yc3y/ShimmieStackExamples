import { Router } from "shimmiestack";
import { ExampleStateListenerType } from "./example-state-listener";

export function ExampleQuery(
    stateListener: ExampleStateListenerType
): Router {
    const router = Router()

    // when receiving a post to /example, respond with the timestamp data
    router.get(
        '/',
        async (req, res) => {
            res.status(200).json(stateListener.getTimeStamps())
        }
    )


    return router
}