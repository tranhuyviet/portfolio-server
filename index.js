import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

server.applyMiddleware({ app });
// server
(async () => {
    const port = process.env.PORT || 5000;
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Database connect successfully');
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
