const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const path = require('path');

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);

const io = socketIO(server);

let waitingUsers = []; // Corrected variable name
let rooms = {};

io.on("connection", (socket) => {
  socket.on("joinroom", () => {
      if (waitingUsers.length > 0) {
          let partner = waitingUsers.shift();
          const roomname = `${socket.id}-${partner.id}`;
          socket.join(roomname);
          partner.join(roomname); // Fixed method to join room.

          io.to(roomname).emit("joined");
      } else {
          waitingUsers.push(socket); // No changes needed here.
      }
  });
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
