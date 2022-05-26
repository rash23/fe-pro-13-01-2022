const entries = [];
let data;

while (true) {
  data = prompt("Please, enter some data");
  if (data === null) break;
  entries.push(data);
}

console.log(entries);

// task 1

const numbers = function (elem) {
  return Number(elem);
};

const sumNum = function (accumulator, elem) {
  return accumulator + Number(elem);
};

let initialValue = 0;
const resOne = entries.filter(numbers).map(numbers).reduce(sumNum, initialValue);

console.log(`Sum: ${resOne}`);

// task 2

const strings = function (elem) {
  return !Number(elem);
};

const sortStings = function (a, b) {
  return b.length - a.length;
};

const lengthOfString = function (elem) {
  return `[${elem.length}]: ${elem}`;
};

const out = function (elem) {
  return console.log(elem);
};

const resTwo = entries.filter(strings).sort(sortStings).map(lengthOfString).forEach(out);
