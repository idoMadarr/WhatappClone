const express = require('express');
const cors = require('cors');
const client = require('./services/redis');

const mongoose = require('mongoose');
const Message = require('./modules/Message');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const communicateRoutes = require('./routes/communicateRoutes');

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/communicate', communicateRoutes);

// Error Middleware
app.use((error, _req, res, _next) => {
  const message = new Message(
    error.message || 'An unknown error occurred',
    error.code || 500
  );
  res.status(error.code || 500).json(message);
});

mongoose
  .connect(URI, {})
  .then(async () => {
    const server = app.listen(PORT, async () => {
      await client.connect();
      console.log(`Server started on port ${PORT}`);
    });
    const io = require('./services/socket').init(server);
    io.on('connection', socket => {
      const clientId = socket.id;
      app.set('socket', socket);
      socket.broadcast.emit('init', { clientId });

      socket.on('message', ({ message, recipient }) => {
        socket.to(recipient).emit('received_message', message);
      });

      socket.on('disconnect', () => {
        console.log(`disconnecting ${clientId}`);
      });
    });
  })
  .catch(error => console.log(error));
