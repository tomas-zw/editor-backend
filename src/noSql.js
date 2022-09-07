const mongo = require("../db/database.js");
const config = require("../config/mongo_db.json");

module.exports = {
    "getAllDocuments": getAllDocuments,
    "getOneDocument": getOneDocument,
    "addDocument": addDocument,
};

async function getAllDocuments(searchObject) {
    const search = searchObject || {};
    let db;
    try {
        db = await mongo.getDb();
        const resultset = await db.collection.find(search).toArray();

        return resultset;
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    } finally {
        if (db.client) {
            await db.client.close();
        }
    }

}

async function getOneDocument(searchObject) {
    const search = searchObject || {};
    const db = await mongo.getDb();
    const resultset = await db.collection.findOne(search);

    await db.client.close();

    return resultset;
}

async function addDocument(docObject) {
    const newDoc = docObject || { name: "new test mumin" };
    const db = await mongo.getDb();
    const result = await db.collection.insertOne(newDoc);

    await db.client.close();

    return result;
}
