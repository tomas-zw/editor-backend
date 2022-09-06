const express = require("express");
const router = express.Router();

const database = require("../db/database.js");
const config = require("../config/mongo_db.json");

router.get("/", async (req, res) => {

    const db = await database.getDb();
    const resultSet = await db.collection.find({}).toArray();
    await db.client.close();

    const data = {
        data: {
            msg: "GET Route/ index",
            mongo: resultSet
        }
    };
    res.status(200).json(data);
});

router.post("/", (req, res) => {
    const data = {
        data: {
            msg: "POST Route/ hello index "
        }
    };
    res.status(201).json(data);
});

router.put("/", (req, res) => {
    res.status(204).send();
});

router.delete("/", (req, res) => {
    res.status(204).send();
});

module.exports = router;
