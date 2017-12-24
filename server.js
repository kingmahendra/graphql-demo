var express = require('express');
var graphqlHTTP = require('express-graphql')
var { buildSchema} = require('graphql');

// construct schema
var schema = buildSchema(`
    type Query {
        quoteOfDay: String
        random: Float!
        rollDice(numDice:Int!, numSides:Int): [Int]
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
    rollDice:({numDice, numSides} )=> {
        let output =[];
        for(let i = 0; i< numDice; i++){
            output.push(1+ Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
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
