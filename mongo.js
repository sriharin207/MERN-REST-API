const mongo = require('mongoose');
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongo.connect(uri);
        console.log(`Connected to Database host ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const disconnectDB = async() => {
    try {
        await mongo.disconnect();
    } catch (error) {
        console.log('DB disconnected')
    }
}
module.exports = {connectDB ,disconnectDB}
