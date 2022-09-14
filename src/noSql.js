const mongo = require("../db/database.js");

module.exports = {
    "getAllDocuments": getAllDocuments,
    "getOneDocument": getOneDocument,
    "addDocument": addDocument,
    "updateDocument": updateDocument,
    "deleteAllDocs": deleteAllDocs
};

async function deleteAllDocs() {
    let db;

    try {
        db = await mongo.getDb();
        const response = await db.collection.deleteMany({});

        return response;
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
        await db.client.close();
    }
}

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
        await db.client.close();
    }
}

async function getOneDocument(searchObject) {
    const search = searchObject || {};
    let db;

    try {
        db = await mongo.getDb();
        const resultset = await db.collection.findOne(search);

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
        await db.client.close();
    }
}

async function updateDocument(docId, newValue) {
    let db;

    try {
        db = await mongo.getDb();
        const result = await db.collection.updateOne(docId, newValue);

        return result;
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
        await db.client.close();
    }
}

async function addDocument(docObject) {
    const newDoc = docObject || { author: "Tomas", title: "This is a very long title", body: "lite blandad text" };
    let db;

    try {
        db = await mongo.getDb();
        const result = await db.collection.insertOne(newDoc);

        return result;
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
        await db.client.close();
    }
}
