import { ErrorRequestHandler } from "express";
import { Logger } from "./logger";
import { catchAllErrorHandler } from "shimmiestack";

export class ExampleCustomError extends Error {
    constructor(
        public status: number,
        msg: string,
        public customErrorCode: string,
    ) {
        super(msg)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExampleCustomError.prototype)
    }
}

export const CustomErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (err) {
        // if you have a custom error format you can handle it here.
        Logger.error(`Something went wrong: ${err.message}`, err.stack)

        // this will catch a thrown ExampleCustomError, and send back the custom error code
        // thrown with the error.
        if (err instanceof ExampleCustomError) {
            return res.status(err.status).json({
                error: err.message,
                errorCode: err.customErrorCode,
                foo:'bar'
            })
        }
        // if not an example error, fall back to default handler.
    }

    // exported from shimmiestack
    return catchAllErrorHandler(err, req, res, next)
}