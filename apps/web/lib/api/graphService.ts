import gql from "graphql-tag";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { singPayload } from "../auth/auth";

export const getServerClient = async function(hostname:string) {
    const httpLink = createHttpLink({

        uri: hostname + '/api/graphql',
      
    });
    
    let token = await singPayload({auth: true});
      
    const authLink = setContext((_, { headers }) => {        
      
        return {
      
          headers: {
      
            ...headers,
      
            authorization: token,
      
          }
      
        }
      
      });

    return new ApolloClient({
        cache: new InMemoryCache(), 
        link: authLink.concat(httpLink),
    });
}

export const REGISTER_MUTATION = gql`
    mutation AddUser($user:UserInput!){
        addUser(user:$user) {
            email,
        }
    }
`

export const GET_USER_QUERY = gql`
query GetUser($email:String!){
    user(email:$email) {
        email,
        name
    }
}  
`

export const GET_USER_WITH_PASS_QUERY = gql`
query GetUserWithPass($email:String!){
    userWithPass(email:$email) {
        password,
        email
    }
}  
`