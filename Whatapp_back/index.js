const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Message = require('./modules/Message');

const SocketIO = require('socket.io');
const http = require('http');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = SocketIO(server, { cors: ['*'] });

app.use('/auth', authRoutes);

const activeUsers = [];
io.on('connection', socket => {
  // Brodcast to single user
  const userId = socket.id;
  activeUsers.push(userId);
  console.log(activeUsers, 'activeusers');
  socket.emit('message', 'Does this work?');

  // Brodcast to everyone (excluding the user itself)
  socket.broadcast.emit('status', 'A user has joined the chat');

  // Brodcast to everyone (including the user itself)
  // io.emit();

  socket.on('disconnect', () => {
    io.emit('status', 'A user has left the chat');
  });
});

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
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => console.log(error));
