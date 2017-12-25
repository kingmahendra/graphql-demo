var express = require('express');
var graphqlHTTP = require('express-graphql')
var { buildSchema} = require('graphql');

// construct schema
var schema = buildSchema(`

    type RandomDie{
        numSides: Int!
        rollOnce: Int!
        roll(numRolls:Int!): [Int]
    }
    type Query {
        getDie(numSides:Int): RandomDie
    }
`);

// this class implement random die graphql type

class RandomDie{
    constructor(numSides){
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({numRolls}) {
        let output = [];
        for( let i = 0 ; i < numRolls; i++){
            output.push(this.rollOnce());
        }
        return output;
    }
}

// root provide a resolver function
var root = {
   getDie:({numSides}) => {
       return new RandomDie(numSides || 6);
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
