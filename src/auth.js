const mongo = require("../db/database.js");

module.exporst = {
    "getUsers": getUsers
}

async function getUsers() {
    const search = searchObject || {};
    let db;

    try {
        db = await mongo.getDb("users");
        const resultset = await db.collection.find(search).toArray();
        //const resultset = await db.users.find(search).toArray();

        return resultset;
    } catch (e) {
        return {
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        };
    } finally {
        await db.client.close();
    }

};
