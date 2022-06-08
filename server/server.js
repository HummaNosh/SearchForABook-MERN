const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// HN
const { ApolloServer } = require('apollo-server-express');
// HN bringing middleware in
const { authMiddleware } = require('./utils/auth')
// HN
const { typeDefs, resolvers } = require('./schemas');
// hn
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  formatError(err) {
    if (err.originalError instanceof AuthenticationError) {
      return new Error('Authentication error');
    }
  },
});

// ----------------------------------------------------------

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);
// HN
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(` Wahoo! Your app is now listening on localhost:${PORT}`));
})};

// hn start the server
startApolloServer(typeDefs, resolvers);