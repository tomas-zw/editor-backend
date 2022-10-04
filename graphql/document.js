const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const DocType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a single document.',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        users: { type: new GraphQLList(GraphQLString)}
    })
})

module.exports = DocType;
