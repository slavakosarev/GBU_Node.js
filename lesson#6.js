const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
// const uuid = require("uuid");

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

// io.engine.generateId = (req) => {
//    return uuid.v4();
// }

// const connections = [];

io.on('connection', (socket) => {
   console.log("connected");
   // connections.push(socket.client.id);
   // console.log(connections);

   io.emit('usercount', io.engine.clientsCount);
   console.log(io.engine.clientsCount);

   socket.on('disconnect', () => {
      // connections.splice(connections.indexOf(socket.client.id), 1);
      // console.log(connections);
      console.log("disconnected");

   });
   socket.on('send mess', (data) => {
      socket.broadcast.emit("send mess", data);
      io.emit('add mess', {
         mess: data.mess,
         name: data.name,
         className: data.className
      });
   });
});

server.listen(8088);