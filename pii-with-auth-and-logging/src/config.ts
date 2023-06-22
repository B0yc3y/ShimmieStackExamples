import { ShimmieConfig } from "shimmiestack";

export type Config = ShimmieConfig & {
    eventBaseConnectionString?: string
    piiBaseConnectionString?: string
}

const baseConfig: ShimmieConfig = {
    ServerPort: 8080,
    CORS: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
    enforceAuthorization: true,
}

export const ExampleConfig: Config = baseConfig

export const ExamplePostgresConfig: Config = {
    ...baseConfig,
    eventBaseConnectionString: process.env.EVENTBASE_CONN_URL, // 'postgresql://eventbase_username:eventbase_password@eventbase_host:eventbase_port/eventbase_database'
    piiBaseConnectionString: process.env.PIIBASE_CONN_URL // 'postgresql://piibase_username:piibase_password@piibase_host:piibase_port/piibase_database'
}