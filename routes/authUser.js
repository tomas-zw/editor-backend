const express = require("express");
const router = express.Router();

const auth = require("../src/auth.js");

router.get("/", async (req, res) => {
    const user = req.query.email;
    const users = await auth.getUser(user);

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
    const _ = await auth.addUser(newUser, res);
});

router.post("/login", async (req, res) => {
    const newUser = req.body;
    const _ = auth.login(newUser, res);
});

module.exports = router;
