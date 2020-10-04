let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Note {
    id : String!
    date : String!
    content : String
    audio : String
    url : String
    participants : [String]
  },

  type Query {
    notes: [Note],
    note(id: String!): Note
  }
`

const notes = [
  { id: "1", date: '2020-10-04', content: 'This is a sentence', audio: 'mp3 file url',
  url: 'https://learn.bcit.ca/d2l/le/content/679512/viewContent/5205513/View',
  participants: ['Paul','June']},
  { id: "2", date: '2020-10-04', content: 'This is a sentence 2', audio: 'mp3 file url',
  url: 'https://learn.bcit.ca/d2l/le/content/679512/viewContent/5205513/View',
  participants: ['June']},
  { id: "3", date: '2020-10-04', content: 'This is a sentence 3', audio: 'mp3 file url',
  url: 'https://learn.bcit.ca/d2l/le/content/679512/viewContent/5205513/View',
  participants: ['Paul']},
];

const resolvers = {
  Query: {
    notes() {
      return notes
    },
    note(parent, args, context, info) { 
      return notes.find(note => note.id === args.id);
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers})
server.listen({port: 4000}).then(({url}) => console.log(`server running at ${url}`))