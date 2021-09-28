import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { graphql } from 'graphql';


// TODO: MAKE QUERIES USING GRAPHQL
const getBooksQuery = gql`
    {
        query books {
            name
            id
        }
    }
`

const BookList = () => {
    const { data } = useQuery(getBooksQuery)
    return data.books.map(({name, id}) => (
        <div>
            <ul key={id} id="book-list">
                <li>{name}</li>
            </ul>
        </div>
    ))
}

export default BookList
