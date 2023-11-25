const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { disconnect } = require('process');

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Server is started');
});

io.on('connection', (socket) => {
  console.log(`user is connected : ${socket.id}`);

  socket.on('disconnect', () => {
    disconnectEventHandler(socket.id);
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket events
const disconnectEventHandler = (id) => {
  console.log(`user is disconnected : ${id}`);
};
