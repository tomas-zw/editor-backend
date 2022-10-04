const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserName',
    description: 'This represents a single UserName.',
    fields: () => ({
        email: { type: GraphQLString },
    })
});

module.exports = UserType;
