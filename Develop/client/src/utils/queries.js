import { gql } from '@apollo/client';
//hn
export const GET_ME = gql`
  query {
    me {
      _id
     username
     email
     bookCount
     
     savedBooks {
        bookId
        authors
        description
        title
        image
        link
     }
    }
  }
`;
