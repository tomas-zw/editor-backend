const express = require("express");
const router = express.Router();

const noSql = require("../src/noSql.js");
const auth = require("../src/auth.js");
const mail = require("../src/mail.js");

const ObjectId = require('mongodb').ObjectId;

router.get(
    "/",
    (req, res, next) => auth.checkToken(req, res, next),
    async (req, res) => {
        let user = {};

        if (req.query.find) {
            user = {
                users: req.query.find,
            };
        }
        console.log(`query: ${req.query}`);
        const documents = await noSql.getAllDocuments(user);

        const data = {
            data: {
                msg: "GET Route/ index",
                collection: documents
            }
        };

        res.status(200).json(data);
    });

router.post(
    "/",
    (req, res, next) => auth.checkToken(req, res, next),
    async (req, res) => {
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

router.put(
    "/",
    (req, res, next) => auth.checkToken(req, res, next),
    async (req, res) => {
        const docId = { _id: ObjectId(req.body._id)};
        const setValue = { $set: { body: req.body.body, title: req.body.title, users: req.body.users } };
        const docResult = await noSql.updateDocument(docId, setValue);
        const data = {
            data: {
                msg: "PUT Route/ index",
                doc: docResult
            }
        };

        //console.log(data);
        res.status(204).json(data);
    });

router.delete("/", (req, res) => {
    res.status(204).send();
});

router.get(
    "/users",
    (req, res, next) => auth.checkToken(req, res, next),
    async (req, res) => {
        const users = await auth.getUserEmails();

        const data = {
            data: {
                msg: "GET Route/ index",
                users: users
            }
        };

        res.status(200).json(data);
    });

router.post(
    "/email",
    (req, res, next) => auth.checkToken(req, res, next),
    async (req, res) => {
        mail.sendEmail(req.body.to, req.body.from);

        const data = {
            data: {
                msg: "GET Route/ email",
                text: "mail sent"
            }
        };

        res.status(200).json(data);
    });

/* for easier testing */
router.get("/testd", async (req, res) => {
    const documents = await noSql.getAllDocuments();

    const data = {
        data: {
            msg: "GET Route/ index",
            collection: documents
        }
    };

    res.status(200).json(data);
});

router.get("/testu", async (req, res) => {
    const users = await auth.getUser();

    const data = {
        data: {
            msg: "GET Route/ testu",
            collection: users
        }
    };

    mail.sendEmail();

    res.status(200).json(data);
});

module.exports = router;
