const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const docs = require("../src/noSql.js");
const DocType = require("./document.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        doc: {
            type: DocType,
            description: 'A single Document',
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
            description: 'List of all wines',
            resolve: async function() {
                const allDocs = await docs.getAllDocuments();

                return allDocs;
            }
        }
    })
});

module.exports = RootQueryType;
