const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const UserType = require("./user.js");

const DocType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a single document.',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        owner: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        users: { type: new GraphQLList(GraphQLString)}
    })
});

module.exports = DocType;
