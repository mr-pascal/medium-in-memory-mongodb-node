import {MongoMemoryServer} from 'mongodb-memory-server';
import {Collection, Db, MongoClient} from 'mongodb';
import {PERSON_COLLECTION} from './src/constants';

let mongo: MongoMemoryServer;
let mongoClient: MongoClient;
let db: Db;

beforeAll(async () => {
    // Start in-memory MongoDB
    mongo = new MongoMemoryServer({});

    // Set Mongo Host and DB name as process variables, because the application expect it as ENV vars
    process.env.MONGO_HOST = await mongo.getUri();
    process.env.MONGO_DB = await mongo.getDbName();

    // Use connect method to connect to the server
    mongoClient = await MongoClient.connect(process.env.MONGO_HOST);
    db = mongoClient.db(process.env.MONGO_DB);

    // Create initial collections
    await db.createCollection(PERSON_COLLECTION);
});

beforeEach(async () => {
    // Get all collections
    const collections: Array<Collection> = await db.collections();
    // Clear all collections before each test case
    await Promise.all(collections.map((collection: Collection) => collection.deleteMany({})));
});

afterAll(async () => {
    // Close connection
    await mongoClient.close();
    // Stop in-memory DB
    await mongo.stop();
});
