module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // A preset that is used as a base for Jest's configuration
    preset: '@shelf/jest-mongodb',

    // Run setup files
    setupFilesAfterEnv: [
        './jest.setup.ts',
    ],

};
