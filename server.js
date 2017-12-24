var express = require('express');
var graphqlHTTP = require('express-graphql')
var { buildSchema} = require('graphql');

// construct schema
var schema = buildSchema(`
    type Query {
        quoteOfDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

// root provide a resolver function
var root = {
    quoteOfDay:()=> {
        return Math.random() < 0.5 ? 'Take it easy ' : 'Salvation lies within';
    },
    random: () =>{
        return Math.random();
    },
    rollThreeDice:()=>{
        return [1,2,3].map(_=> 1 + Math.floor(Math.random()* 6));
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
