import { gql } from "apollo-boost";

// get all books query
const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

// get all authors query
const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

// add book query

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`

export {
    getBooksQuery,
    getAuthorsQuery,
    addBookMutation
}