const mongoose = require('mongoose');
// Importing mongo utl from .env file
const url = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        // Connecting server to mongodb
        await mongoose.connect(url);
        console.log('server connected to database successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;