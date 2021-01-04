import {DBHelper} from './dbhelper';
import {IPerson} from './models/person.interface';

describe(`DB example`, () => {
    const dbHelper: DBHelper = new DBHelper();

    beforeAll(async () => {
        // Get MongoDB information from ENV variables
        const mongoHost: string = process.env.MONGO_HOST || '';
        const mongoDbName: string = process.env.MONGO_DB || '';

        // Create one connection for all tests
        await dbHelper.createConnection(mongoHost, mongoDbName);
    });

    afterAll(async () => {
        // Close connection when tests are done
        await dbHelper.closeConnection();
    });

    describe(`Persons`, () => {
        describe(`Add persons`, () => {
            it('Should add persons to the db', async () => {
                // Create persons and write into DB
                const persons: IPerson[] = [{name: 'Pascal'}, {name: 'Florian'}];
                await dbHelper.addPersonsToDb(persons);

                // Get persons from DB, which should match our persons
                const personsResult: IPerson[] = await dbHelper.getPersonsFromDb();
                expect(personsResult).toMatchObject(persons);
            });
        });

        describe(`Get persons`, () => {
            it(`Should get empty persons array from db`, async () => {
                // Request the persons from the DB
                const personsResult: IPerson[] = await dbHelper.getPersonsFromDb();
                expect(personsResult).toHaveLength(0);
            });
        });
    });
});
