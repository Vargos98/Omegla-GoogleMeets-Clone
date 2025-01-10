const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const path = require('path');

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app)

const io = socketIO(server)

io.on("connection",(socket)=>{
  
})

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);


server.listen(3000,()=>{
  console.log('Server is running on port 3000');  // Server is running on port 3000
});