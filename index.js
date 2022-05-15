const colors = require("colors/safe");

const isPrime = (number) => {

   if (number < 2) return false;

   for (let i = 2; i <= number / 2; i++) {

      if (number % i === 0) {
         return false;
      }
   }
   return true;
};

let primeCount = 0;
let colorCount = 1;

const from = +process.argv[2];
const to = +process.argv[3];

if (!(isFinite(from) && isFinite(to))) {
   console.error(colors.red("Is not a number!"))
}

for (let number = from; number <= to; number++) {

   let colorer = colors.green;

   if (isPrime(number)) {
      primeCount += 1;
      if (colorCount % 2 === 0) {
         colorer = colors.yellow;
         colorCount += 1;
      } else if (colorCount % 3 === 0) {
         colorer = colors.red;
         colorCount = 1;
      } else {
         colorCount += 1;
      }
      console.log(colorer(number));
   }
   if (primeCount === 0) {
      console.error(colors.red("Prime numbers - not found!"));
   }
}


