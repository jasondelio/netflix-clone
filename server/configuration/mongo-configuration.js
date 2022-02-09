const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Connection Successfull');
    } catch (err) {
        console.log('Failed to connect to DB', err);
    }
};

module.exports = connectDB;