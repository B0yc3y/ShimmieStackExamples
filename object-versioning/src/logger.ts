import Winston from 'winston'

let Logger: Winston.Logger = Winston.createLogger()

const opts = {
    level: 'info',
    format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.prettyPrint(),
        Winston.format.simple()
    ),
    defaultMeta: {service: 'pii-with-auth-and-logging', foo: 'bar' },
    transports: [new Winston.transports.Console()],
}
Logger = Winston.createLogger(opts)
Logger.info('Configuring custom app logger: ')
Logger.info('Configuring uncaught exception logger: ')

// ensure we log on unhandled exceptions/rejections
process.on('uncaughtException', function (err) {
    // use `winston` or your own Logger instance as appropriate
    Logger.error(`Uncaught exception occurred: ${err} - ${err.stack}`)
    throw err
})

process.on('unhandledRejection', (err) => {
    throw err
})


export { Logger }