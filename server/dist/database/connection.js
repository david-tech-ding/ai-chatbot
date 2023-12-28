import { connect, disconnect } from 'mongoose';
const connectToDatabase = async () => {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to connect to MongoDB');
    }
};
const disconnectFromDatabase = async () => {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error('Failed to disconnect from MongoDB');
    }
};
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map