require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const index = require("./routes/index");
const resetDb = require("./routes/resetDb");
const authUser = require("./routes/authUser");
const auth = require("./src/auth.js");

const bodyParser = require("body-parser");

const app = express();

//----------------graphql--------------

const { graphqlHTTP } = require("express-graphql");
const RootQueryType = require("./graphql/root.js");
const {
    GraphQLSchema
} = require("graphql");

const visual = false;
const schema = new GraphQLSchema({
    query: RootQueryType
});

//----------------graphql--------------


//----------------socket-------------------------

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket) {
    console.log(`connected ${socket.id}`);

    socket.on("create", (room) => {
        socket.join(room);
        console.log("joined room");
    });

    socket.on("leave", (room) => {
        socket.leave(room);
        console.log("left room");
    });

    socket.on("update_document", (currentDoc) => {
        socket.to(currentDoc._id).emit("update_document", currentDoc);
    });

    socket.on("disconnect", () => {
        console.log(`disconnected ${socket.id}`);
    });
});

//----------------socket-------------------------

const port = process.env.PORT || 1337;


app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
// for parsing application/x-www-form-urlencodedapp.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}


app.use(express.json());

app.use("/", index);
app.use("/resetdb", resetDb);
app.use("/auth", authUser);

//----------------graphql--------------

app.use('/graphql',
    (req, res, next) => auth.checkToken(req, res, next),
    graphqlHTTP({
        schema: schema,
        graphiql: visual, // Visual är satt till true under utveckling
    }));

//----------------graphql--------------

app.use((req, res, next) => {
    var err = new Error(`${req.path} Not Found`);

    err.status = 404;
    next(err);
});

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
});

const server = httpServer.listen(port, () => console.log(`listening on port ${port}!`));

/*
app.get("/test/:msg", (req, res) => {
    const data = {
        data: {
            msg: `GET/ hello json + ${req.params.msg}`
        }
    };

    res.status(200).json(data);
});
*/

module.exports = server;
