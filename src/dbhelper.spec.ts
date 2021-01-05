// src/dbhelper.spec.ts
import {DBHelper} from './dbhelper';
import {IPerson} from './models/person.interface';

/**
 * Start our test file where we test our DBHelper class
 */
describe(`DBHelper`, () => {
    /**
     * 1.
     * Initialize a instance of our DBHelper
     */
    const dbHelper: DBHelper = new DBHelper();

    /**
     * 2.
     * Before running our test cases we create a connection to our in-memory MongoDB.
     * In Theory we could do it before each test case instead of once before all
     * but this would just cost unnecessary milliseconds. There is no reason to reconnect each time.
     */
    beforeAll(async () => {
        // Get MongoDB information from ENV variables
        const mongoHost: string = process.env.MONGO_HOST || '';
        const mongoDbName: string = process.env.MONGO_DB || '';

        // Create one connection for all tests
        await dbHelper.createConnection(mongoHost, mongoDbName);
    });

    /**
     * 3.
     * After running all the tests we have to make sure to close the connection!
     * Otherwise Jest will not shutdown because there are still "open handles"
     */
    afterAll(async () => {
        // Close connection when tests are done
        await dbHelper.closeConnection();
    });

    /**
     * 4.
     * Test block for doing all 'Persons' related tests.
     */
    describe(`Persons`, () => {
        /**
         * 5.
         * Test block for checking the logic of adding persons
         */
        describe(`Add persons`, () => {
            /**
             * 6.
             * We expect that we get exactly the persons from the DB we just put in there
             */
            it('Should add persons to the db', async () => {
                // Create some persons
                const persons: IPerson[] = [{name: 'Pascal'}, {name: 'Florian'}];
                // Write the persons into our DB
                await dbHelper.addPersonsToDb(persons);

                // Get all persons from DB
                const personsResult: IPerson[] = await dbHelper.getPersonsFromDb();
                // The persons should match our persons we just wrote into DB
                expect(personsResult).toMatchObject(persons);
            });
        });

        /**
         * 7.
         * Test block for checking the logic of getting persons
         */
        describe(`Get persons`, () => {
            /**
             * 8.
             * We expect that we get 0 persons from the DB since we haven't added
             * any in this test case and the DB should be clean
             */
            it(`Should get empty persons array from db`, async () => {
                // Request the persons from the DB
                const personsResult: IPerson[] = await dbHelper.getPersonsFromDb();
                expect(personsResult).toHaveLength(0);
            });
        });
    });
});
