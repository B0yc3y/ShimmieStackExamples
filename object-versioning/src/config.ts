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
    enforceAuthorization: false,
}

export const ExampleConfig: Config = baseConfig
