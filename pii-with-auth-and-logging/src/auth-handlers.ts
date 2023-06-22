import { NextFunction, Request, Response } from "express";
import { authorizeApi } from "shimmiestack/authorizers";

const users = [
    {
        userId: 'bobby',
        name: 'bobby',
        token: 'bobbysInsecureToken'
    },
    {
        userId: 'notBobby',
        name: 'notBobby',
        token: 'notBobbysInsecureToken'
    }
]

// Here is an insecure example of auth middleware
export const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response<undefined, Record<string, unknown>> => {
    const authHeader = req.headers['authorization']

    // this is where you can decode a jwt, call a third party etc.
    const user = authHeader ? users.find(u => u.token === authHeader) : undefined

    if (!authHeader || !user) {
        return res.sendStatus(401)
    }

    // set the user context for the request
    res.locals.user = user

    return next()
}

// checks if the user is bobby.
const isExampleUserAuthorizer = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    if (res.locals.user?.userId !== 'bobby') {
        console.error(
            `Unauthorized user ${res.locals.user} attempted to access path: `,
            req.path
        )
        return res.sendStatus(403)
    }
    return next()
}

// 'authorizeApi' is here to tell shimmiestack any api with this middleware is auth'd
export const authorizeExampleAccessRequest = authorizeApi(isExampleUserAuthorizer)