const mongoose = require('mongoose');


const env=require('dotenv')
env.config()

const DB_URL =process.env.MONGODB_URI//לשאול את המתרגלתמד

exports.connectToDB = async function connectToDB() {
    try {
        // התחברות לדטהבייס
        await mongoose.connect(DB_URL);
        console.log('mongo connected');
    } catch (error) {
        console.log('mongo failed', error);
    }
}
