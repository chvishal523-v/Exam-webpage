const mongoose = require('mongoose');
//this is for  just to say uri is connected or not
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in .env');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('Mongo DataBase connected');
};

module.exports = connectDB;
