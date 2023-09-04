import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'
import { addUser, getUsers, getUsersWithPasswords } from "../../lib/db/db";

const typeDefs = gql`
  type Query {
    user(email: String): User
    userWithPass(email: String): User
  }

  type User {
    userId: Int,
    name: String,
    email: String,
    password: String
  }

  type Mutation {
    addUser(user:UserInput!):User
  }

  input UserInput {
    name: String,
    email: String,
    password: String
  }
`;

const resolvers = {
  Query: {
    async user(parent, args, contextValue, info) {
      return (await getUsers()).find((user) => user.email === args.email);
    },

    async userWithPass(parent, args, contextValue, info) {
      return (await getUsersWithPasswords()).find((user) => user.email === args.email);
    }
  },
  Mutation: {
    async addUser(parent, args, contextValue, info) {
      
      let user = args.user;

      try {
        let result = await addUser({
          email: user.email,
          name: user.name,
          password: user.password
        })

        return {
          userId: result.id,
          name: result.name,
          email: result.email,
          password: result.password
        };
      } catch(e) {

        console.log("err", e);
        
        return {
          error: "Db error"
        }
      }
    }
  }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

export default startServerAndCreateNextHandler(apolloServer);
