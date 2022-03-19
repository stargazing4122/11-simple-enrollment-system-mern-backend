const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MONGODB_CNN);
    console.log('Database online')
  } catch (err) {
    console.log(err);
    throw new Error('error al conectarse a la base de datos');
  }

}

module.exports = dbConnection;