const http = require('http');
const url = require("url");
const path = require("path");
const fs = require('fs/promises');
const { lstatSync, existsSync } = require('fs');

const isFile = (filepath) => {
   return lstatSync(filepath).isFile();
}

http.createServer(async (req, res) => {

   const query = url.parse(req.url, true);
   let queryPath = query.pathname === "/" ? "" : query.pathname;
   const navPath = path.join(__dirname, queryPath);

   if (!existsSync(navPath)) return res.end('File or directory not found');
   if (isFile(navPath)) {
      const data = await fs.readFile(navPath)
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(data)
   } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const list = await fs.readdir(navPath);
      list.forEach(item => {
         res.write(`<p><a href="http://localhost:8088${queryPath}/${item}">${item}</a></p>`)
      })
   }
   res.end()

}).listen(8088, 'localhost');