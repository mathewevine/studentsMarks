const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userName = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASS;
const uri = `mongodb+srv://${userName}:${userPassword}@bharatintern.cy0iz3b.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const studentsRouter = require('./routes/students');
app.use('/students', studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
