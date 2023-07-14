import { Router } from "shimmiestack";
import { SongStateListenerType } from "./song-state-listener";

export function SongQuery(
    stateListener: SongStateListenerType
): Router {
    const router = Router()

    // when receiving a post to /example, respond with the timestamp data
    router.get(
        '/',
        async (req, res) => {
            res.status(200).json(stateListener.getSongs())
        }
    )


    return router
}