const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connecting to mongodb database
mongoose.connect('mongodb+srv://lex:popskull007@mongodocker.wc1lj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5001, () => {
    console.log('Server running on port 5000')
});