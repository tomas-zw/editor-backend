const express = require("express");
const router = express.Router();

const auth = require("../src/auth.js");

router.get("/", async (req, res) => {
    const users = await auth.getAllDocuments();

    const data = {
        data: {
            msg: "GET Route/ auth",
            collection: users
        }
    };

    res.status(200).json(data);
});
