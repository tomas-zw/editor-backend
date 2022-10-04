const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const docs = require("../src/noSql.js");
const users = require("../src/auth.js");
const DocType = require("./document.js");
const UserType = require("./user.js");
const { name } = require('./document.js');

const RootQueryType = new GraphQLObjectType({
    name: 'Root',
    description: 'Root Query',
    fields: () => ({
        doc: {
            type: DocType,
            description: 'A single Document.',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const wine = await docs.getOneDocument(args.id);

                return wine;
            }
        },
        docs: {
            type: new GraphQLList(DocType),
            description: 'List of all Documents.',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let allDocs = {};

                if (args.email) {
                    allDocs = await docs.getAllDocuments({users: args.email});
                } else {
                    allDocs = await docs.getAllDocuments();
                }

                return allDocs;
            }
        },
        userNames: {
            type: new GraphQLList(UserType),
            description: 'List of all Usernames.',
            resolve: async function() {
                const allUsers = await users.getUserEmails();

                return allUsers;
            }
        }
    })
});

module.exports = RootQueryType;
