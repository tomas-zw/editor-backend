const express = require("express");
const router = express.Router();

const noSql = require("../src/noSql.js");


router.delete("/", async (req, res) => {
    const result = await noSql.deleteAllDocs();

    const data = {
        data: {
            msg: "DELETE Route/ resetDb",
            collection: result
        }
    };

    res.status(200).json(data);
});

module.exports = router;
