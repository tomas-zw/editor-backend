## Editor-backend

`npm install` installs all dependencies.

`npm run start` runs the app in development mode.

`npm run watch` runs the app in dev mode, but automatically restarts the app 
when file changes are detected. (nodemon)

`npm run production` runs the app in production mode.

Very basic routing for now. 


`GET`  : "/"

Return all documents.

```
data: {
    msg: <current route>,
    collection: [
        {
            _id: <document_id>,
            title: "a Title",
            body: "document body"
        },
        {
            _id: <document_id>,
            title: "another Title",
            body: "another document body"
        }
    ]
}



```

`POST`  : "/"

Add a document.

```body
title: <the title>
body: <document body>

```
returns.

```
data: {
        "msg": <current route>,
        "doc": {
            "acknowledged": true,
            "insertedId": "631b4161c07a23a3bcecd85c"
        }
    }``

```

`PUT`  : "/"

Update a document.

```body
_id: <document_id>
title: <new title>
text: <new document body>

```

