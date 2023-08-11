const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config();
require('./config/db').connect();

app.use(express.json());

app.use('/api/v1/student', studentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`The server running on: htpp://localhost:${process.env.PORT}`)
);
