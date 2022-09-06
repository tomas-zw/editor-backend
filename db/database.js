const mongo = require("mongodb").MongoClient;
const config = require("../config/mongo_db.json");

const database = {
    getDb: async function getDb () {
        let dsn = `${config.prodUrl}${config.prodDb}`;

        if (process.env.NODE_ENV === 'test') {
            dsn = `${config.localUrl}${config.localDb}`;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(config.collection);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
