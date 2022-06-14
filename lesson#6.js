const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
   const indexPath = path.join(__dirname, "./index.html");
   const readStream = fs.createReadStream(indexPath);
   readStream.pipe(res);
});

const io = socket(server);

const connections = [];
console.log(connections);


io.on('connection', (client) => {
   io.emit('connected', { client: data.client })
   console.log("connected");
   connections.push(client);

   client.on('disconnect', (data) => {
      io.emit('disconnected', { client: data.client })
      connections.splice(connections.indexOf(client), 1);
      console.log("disconnected");
      console.log(data);
   });
   client.broadcast.emit("send mess", data);
   client.on('send mess', (data) => {
      io.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
   });
});

server.listen(8080);