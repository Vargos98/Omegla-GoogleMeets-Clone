const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const path = require('path');

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);

const io = socketIO(server);

let waitingUsers = [];
let rooms = {};

io.on("connection", (socket) => {
    socket.on("joinroom", () => {
        if (waitingUsers.length > 0) {
            let partner = waitingUsers.shift();
            const roomname = `${socket.id}-${partner.id}`;
            socket.join(roomname);
            io.sockets.sockets.get(partner.id).join(roomname); // Corrected partner joining logic

            io.to(roomname).emit("joined", roomname);
        } else {
            waitingUsers.push(socket);
        }
    });

    socket.on("signalingMessage", function(data){

      socket.broadcast.to(data.room);

    })

    socket.on("message",(data)=>{
     socket.broadcast.to(data.room).emit("message", data.message); 
    })

    socket.on('disconnect', function(){
        let index = waitingUsers.findIndex(
            (user) => user.id === socket.id
        );
        if (index !== -1) waitingUsers.splice(index, 1); // Safe removal
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