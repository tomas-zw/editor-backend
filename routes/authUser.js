const express = require("express");
const router = express.Router();

const auth = require("../src/auth.js");

router.get("/", async (req, res) => {
    const users = await auth.getUsers();

    const data = {
        data: {
            msg: "GET Route/ auth",
            collection: users
        }
    };

    res.status(200).json(data);
});

router.post("/", async (req, res) => {
    const newUser = req.body;
    const userResult = await auth.addUser(newUser);
    const data = {
        data: {
            msg: "POST Route/ hello index ",
            doc: userResult
        }
    };

    res.status(201).json(data);
});

module.exports = router;
