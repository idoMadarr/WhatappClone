const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Message = require('./modules/Message');

// const SocketIO = require('socket.io');
// const http = require('http');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());
// const server = http.createServer(app);
// const io = SocketIO(server, { cors: ['*'] });

app.use('/auth', authRoutes);

// const activeUsers = [];
// io.on('connection', socket => {
//   const email = socket.handshake.query.email;

//   const activeUser = activeUsers.find(identifier => identifier === email);
//   if (activeUser) {
//     return socket.broadcast.emit(
//       'sessionTimeout',
//       'Your session has time out, please sign in again'
//     );
//   } else {
//     activeUsers.push(email);
//   }

//   socket.on('disconnect', () => {
//     const userIndex = activeUsers.indexOf(email);
//     activeUsers.splice(userIndex, 1);
//     socket.broadcast.emit('status', `${email} has left the chat`);
//     console.log(activeUsers, 'activeusers');
//   });

//   // Broadcast to single user
//   // socket.emit('message', 'Welcome to WhatappClone');

//   // Broadcast to everyone (excluding the user itself)
//   // socket.broadcast.emit('status', 'A user has joined the chat');

//   // Broadcast to everyone (including the user itself)
//   console.log(activeUsers, 'activeusers');
// });

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
    const server = app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
    const io = require('./services/socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch(error => console.log(error));
