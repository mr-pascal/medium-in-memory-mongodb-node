// jest.config.js
module.exports = {

    /**
     * 1.
     * Add some TypeScript specific Jest configuration (not needed if you use plain JS)
     */
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    /**
     * 2.
     * Add the preset @shelf/jest-mongodb to tell Jest that it should use the npm module
     * we downloaded to apply some predefined settings for using the in-memory MongoDB
     */
    preset: '@shelf/jest-mongodb',

    /**
     * 3.
     * Define that the ./jest.setup.ts file should be run after the Jest environment was set up.
     * This setup file will contain the ramp up/down of the in-memory MongoDB
     */
    setupFilesAfterEnv: [
        './jest.setup.ts',
    ],

};
