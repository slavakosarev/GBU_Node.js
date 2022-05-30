const EventEmitter = require('events');
const moment = require('moment');

const eventEmitter = new EventEmitter();
const args = moment(process.argv[2], 'HH-DD-MM-YYYY');
const userDate = Date.parse(args);

const timer = () => {

   let now = new Date();
   let diff = userDate - now;

   if (diff === 0) {
      console.log('Time is over');
      return
   }

   year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
   day = Math.floor(diff / (1000 * 60 * 60 * 24));
   hour = Math.floor(diff / (1000 * 60 * 60));
   min = Math.floor(diff / (1000 * 60));
   sec = Math.floor(diff / 1000);

   y = year;
   d = day - year * 365;
   h = hour - day * 24;
   m = min - hour * 60;
   s = sec - min * 60;
   console.log(`Time left: 
   ${y}-years(year), 
   ${d}-days(day), 
   ${h}-hours(hour), 
   ${m}-minutes(minute), 
   ${s}-seconds(second)
   `);
};

setInterval(() => timer(), 1000);

eventEmitter.on('timer', (msg) =>
   console.log(msg)
);
eventEmitter.on('error', (error) =>
   console.log('Error: ', error)
);

eventEmitter.emit('timer', 'Started: ');