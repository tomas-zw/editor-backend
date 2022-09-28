const mongo = require("mongodb").MongoClient;
const config = require("../config/mongo_db.json");

const database = {
    getDb: async function getDb(getUsers) {
        //its a URL so disabled eslint for readability
        //eslint-disable-next-line max-len
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.wsvijsm.mongodb.net/?retryWrites=true&w=majority`;

        const collection = getUsers ? config.users : config.collection

        if (process.env.NODE_ENV === 'test') {
            dsn = `${config.localUrl}`;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //console.log(client);
        const db = await client.db();
        const data = await db.collection(collection);

        return {
            collection: data,
            client: client,
        };
    }
};

module.exports = database;
