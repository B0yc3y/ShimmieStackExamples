
const jestConfig = {
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts'],
    testTimeout: 10000,
    setupFiles: ['<rootDir>/jest.setup.ts'],
}

export default jestConfig
