const mongoose = require('mongoose');

const db_String = process.env.DB_URL.replace(
  '<password>',
  process.env.DB_PASSWORD
);

module.exports.connect = async () => {
  try {
    await mongoose.connect(db_String, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database successfuly');
  } catch (err) {
    console.log(err.message);
  }
};
