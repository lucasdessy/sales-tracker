import express, { Express } from 'express';
import { config } from "./config";
// Mongooose
import mongoose from 'mongoose';
import { configureRoutes } from './routes';
(() => {
// Connect to MongoDB
    if (config.server.mongoUri) {
    console.log('Connecting to MongoDB...');
    mongoose.connect(config.server.mongoUri);
} else {
    throw new Error('MongoDB URI is not defined');
}
    const app: Express = express();
    configureRoutes(app);
    app.listen(config.server.port, () => {
        return console.log(`[server]: Server is running on ${config.server.port}`);
    });
})();
