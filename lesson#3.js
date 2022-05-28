const fs = require("fs");
const { Transform } = require("stream");
const colors = require("colors/safe");

const readStream = fs.createReadStream("./logs/access.log", "utf-8");
readStream.on('error', () => console.log(err));
readStream.on('end', () => console.log(colors.green('File reading finished')));

const transformStreamIP1 = new Transform({

   transform(chunk, _encoding, callback) {
      const transformedChunk = chunk.toString().match(/^89.123.1.41.*/gm).join('\n');
      callback(null, transformedChunk);
   }
});
const transformStreamIP2 = new Transform({

   transform(chunk, _encoding, callback) {
      const transformedChunk = chunk.toString().match(/^34.48.240.111.*/gm).join('\n');
      callback(null, transformedChunk);
   }
});

const writeStreamIP1 = fs.createWriteStream('./logs/%89.123.1.41%_requests.log', {
   flags: "a",
   encoding: "utf-8",
});
const writeStreamIP2 = fs.createWriteStream('./logs/%34.48.240.111%_requests.log', {
   flags: "a",
   encoding: "utf-8",
});

readStream.pipe(transformStreamIP1).pipe(writeStreamIP1);
readStream.pipe(transformStreamIP2).pipe(writeStreamIP2);

