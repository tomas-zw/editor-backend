const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const index = require("./routes/index");

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.use(express.json());

app.use("/", index);

app.get("/test/:msg", (req, res) => {
    const data = {
        data: {
            msg: `GET/ hello json + ${req.params.msg}`
        }
    }
    res.status(200).json(data);
});

app.use((req, res, next) => {
    var err = new Error(`${req.path} Not Found`);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message,
            }
        ]
    });
})

app.listen(port, () => console.log(`listening on port ${port}!`));

