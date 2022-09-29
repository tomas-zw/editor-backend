const mongo = require("../db/database.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

module.exports = {
    "getUser": getUser,
    "addUser": addUser,
    "login": login,
    "checkToken": checkToken
};

async function login(user, res) {
    let resultset = {};
    let validate = {};

    if (user) {
        validate = { ...user };
    }
    let db;

    try {
        db = await mongo.getDb("users");
        resultset = await db.collection.find({email: validate.email}).toArray();
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    } finally {
        await db.client.close();
    }
    if (!resultset[0]) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/login",
                title: "user not found",
                detail: "wrong email adress"
            }
        });
    }
    validatePassword(validate, resultset[0].password, res);
}

async function validatePassword(user, hash, res) {
    bcrypt.compare(user.password, hash, async function(err, result) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/auth",
                    title: "bcrypt error",
                    detail: "failed to hash password"
                }
            });
        }
        if (result) {
            const payload = { email: user.email };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });

            return res.status(201).json({
                data: {
                    email: user.email,
                    token: token,
                }
            });
        }
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/login",
                title: "Password error",
                detail: "Password not correct"
            }
        });
    });
}

async function getUser(userEmail) {
    let email = {email: userEmail};

    if (userEmail === "all") {
        email = {};
    }
    let db;

    try {
        db = await mongo.getDb("users");
        const resultset = await db.collection.find(email).toArray();

        return resultset;
    } catch (e) {
        return {
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        };
    } finally {
        await db.client.close();
    }
}

async function addUser(newUser, res) {
    //TODO return err if no newUser
    const user = newUser || {
        email: "not@valid.user",
        password: "aHashedValue",
    };

    bcrypt.hash(newUser.password, saltRounds, async function(err, hash) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/auth",
                    title: "bcrypt error",
                    detail: "failed to hash password"
                }
            });
        }
        user.password = hash;

        let db;

        try {
            db = await mongo.getDb("users");
            const result = await db.collection.insertOne(user);

            return res.status(200).json({
                data: {
                    msg: "POST route/ auth",
                    user: result,
                }
            });
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/auth",
                    title: "database error",
                    detail: "something"
                }
            });
        } finally {
            console.log("closing db");
            await db.client.close();
        }
    });
}

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    message: "Token is not valid."
                }
            });
        }

        // Valid token send on the request
        next();
    });
}
