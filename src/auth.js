const mongo = require("../db/database.js");

module.exports = {
    "getUsers": getUsers,
    "addUser": addUser
}

async function getUsers(searchObject) {
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
}

async function addUser(newUser) {
    //const newUser = docObject || {
    const user = newUser || {
        email: "any@mail.com",
        password: "aHashedValue",
    };
    let db;

    try {
        db = await mongo.getDb("users");
        const result = await db.collection.insertOne(user);

        return result;
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
}
