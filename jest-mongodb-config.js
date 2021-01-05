// jest-mongodb-config.js
/**
 * Don't change the name of this file.
 * The name is hardcoded inside the '@shelf/jest-mongodb' npm module!
 */

module.exports = {
    /**
     * Define some defaults to use for the in-memory MongoDB
     */
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest',
        },
        binary: {
            // Version of MongoDB
            version: '4.0.2',
            skipMD5: true,
        },
        autoStart: false,
    },
};
