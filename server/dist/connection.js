import { connect, disconnect } from 'mongoose';
//used boilerplate from moongoosejs.com
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
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
export default { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map