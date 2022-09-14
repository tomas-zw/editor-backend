const express = require("express");
const router = express.Router();

const noSql = require("../src/noSql.js");

const ObjectId = require('mongodb').ObjectId;

router.get("/", async (req, res) => {
    const documents = await noSql.getAllDocuments();

    const data = {
        data: {
            msg: "GET Route/ index",
            collection: documents
        }
    };

    res.status(200).json(data);
});

router.post("/", async (req, res) => {
    const newDoc = req.body;
    const docResult = await noSql.addDocument(newDoc);
    const data = {
        data: {
            msg: "POST Route/ hello index ",
            doc: docResult
        }
    };

    res.status(201).json(data);
});

router.put("/", async (req, res) => {
    const docId = { _id: ObjectId(req.body._id)};
    const setValue = { $set: { body: req.body.text, title: req.body.title } };
    const docResult = await noSql.updateDocument(docId, setValue);
    const data = {
        data: {
            msg: "PUT Route/ index",
            doc: docResult
        }
    };

    console.log(data);
    res.status(204).json(data);
});

router.delete("/", (req, res) => {
    res.status(204).send();
});

module.exports = router;
