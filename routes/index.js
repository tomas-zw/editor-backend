const express = require("express");
const router = express.Router();

const noSql = require("../src/noSql.js");

const database = require("../db/database.js");

router.get("/", async (req, res) => {

    const test = {name: "testmumin"};
    const documents = await noSql.getAllDocuments();

    const data = {
        data: {
            msg: "GET Route/ index",
            mongo: documents
        }
    };
    res.status(200).json(data);
});

router.post("/", async (req, res) => {

    const docResult = await noSql.addDocument();
    const data = {
        data: {
            msg: "POST Route/ hello index ",
            id : docResult
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
