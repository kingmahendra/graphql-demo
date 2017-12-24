var {graphql, buildSchema} = require('graphql');

// construct schema
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// root provide a resolver function
var root = {
    hello:()=> {
        return 'Hello World';
    },
};

// run the graphql query
graphql(schema, '{hello}', root).then(response => {
    console.log(response);
})
