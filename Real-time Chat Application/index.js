const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('load messages', messages);

  socket.on('chat message', (msg) => {
    const message = { text: msg.text, sentBy: socket.id };
    messages.push(message);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
