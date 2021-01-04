import {Collection, Db, MongoClient} from 'mongodb';
import {PERSON_COLLECTION} from './constants';
import {IPerson} from './models/person.interface';


/**
 * DB Helper to handle our connections and access to our DB
 */
export class DBHelper {
    private mongoClient: MongoClient | undefined;
    private db: Db | undefined;

    /**
     * Creates a connection to the MongoDB
     * @param {string} uri
     * @param {string} dbName
     */
    public async createConnection(uri: string, dbName: string): Promise<void> {
        if (this.mongoClient) {
            // No need to initialize two times
            // would lead to endless open connections
            return;
        }
        this.mongoClient = await MongoClient.connect(uri);
        this.db = this.mongoClient.db(dbName);
    };

    /**
     * Closes the connection to the MongoDB
     */
    public async closeConnection(): Promise<void> {
        return this.mongoClient?.close();
    };

    /**
     * Add an array of persons to the Database
     * @param {IPerson[]} persons
     */
    public async addPersonsToDb(persons: IPerson[]): Promise<void> {
        if (!this.db) {
            throw new Error('No DB available!');
        }
        const personsCollection: Collection<IPerson> = await this.db.collection(PERSON_COLLECTION);
        await personsCollection.insertMany(persons);
    };

    /**
     * Returns an array of IPerson[]
     */
    public async getPersonsFromDb() : Promise<IPerson[]> {
        if (!this.db) {
            throw new Error('No DB available!');
        }
        const personsCollection: Collection<IPerson> = await this.db.collection(PERSON_COLLECTION);
        return personsCollection.find({}).toArray();
    };
}
