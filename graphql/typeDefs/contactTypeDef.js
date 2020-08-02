import { gql } from 'apollo-server-express';

export default gql`
    type Contact {
        id: ID!
        name: String!
        email: String!
        message: String!
        createdAt: String
    }

    extend type Mutation {
        createContact(name: String!, email: String!, message: String!, recaptcha: String!): String!
    }
`;
