const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./modules/Message');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.use((error, _req, res, _next) => {
  const message = new Message(
    error.message || 'An unknown error occurred',
    error.code || 500
  );
  res.status(error.code || 500).json(message);
});

mongoose
  .connect(URI, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => console.log(error));
