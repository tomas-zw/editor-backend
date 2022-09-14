const mongo = require("mongodb").MongoClient;
const config = require("../config/mongo_db.json");

const database = {
    getDb: async function getDb() {
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.wsvijsm.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = `${config.localUrl}`;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(client);
        const db = await client.db();
        const collection = await db.collection(config.collection);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
