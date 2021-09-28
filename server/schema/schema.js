const graphql = require('graphql');
const _ = require('lodash')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


// dummy data
var books = [
    {name: 'The wind', genre: 'fantasy', id: '1', authorId: '1'},
    {name: 'The Final empire', genre: 'fantasy', id: '2', authorId: '2'},
    {name: 'The Long yard', genre: 'Comedy', id: '3', authorId: '3'},
    {name: 'The Final Game', genre: 'fantasy', id: '4', authorId: '2'},
    {name: 'The Longest yard', genre: 'Comedy', id: '5', authorId: '3'},
    {name: 'The Shortest yard', genre: 'Comedy', id: '6', authorId: '3'},
];

var authors = [
    {name:"Patrick", age: 44, id: '1'},
    {name:"Mercy Wambui", age: 20, id: '2'},
    {name:"Alexander Thuo", age: 26, id: '3'},
]

// object type BookType
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id:parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

// how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                console.log(typeof(args.id))
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // console.log(typeof(args.id))
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});