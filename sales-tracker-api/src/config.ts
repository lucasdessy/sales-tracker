import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || null;
const JWT_SECRET = process.env.JWT_SECRET || null;
export const config = {
    server: {
        port: PORT,
        mongoUri: MONGO_URI,
    },
    jwt: {
        secret: JWT_SECRET,
    },
};