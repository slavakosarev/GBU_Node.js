const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});


const connections = [];

io.on('connection', (socket) => {
   console.log("connected");
   connections.push(socket.client.id);
   console.log(connections);

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket.client.id), 1);
      console.log("disconnected");
      console.log(connections);

   });
   // client.broadcast.emit("send mess", data);
   socket.on('send mess', (data) => {
      io.emit('add mess', {
         mess: data.mess,
         name: data.name,
         className: data.className
      });
   });
});

server.listen(8088);