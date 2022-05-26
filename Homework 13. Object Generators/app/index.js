// Создать генератор високосных годов, начиная с 1900 по указанный (по умолчанию текущий) год.

const CURRENT_YEAR = new Date().getFullYear();

function* leapYears(entrYear = CURRENT_YEAR) {
  for (let year = 1900; year < entrYear; year++) {
    if (new Date(year, 2, 0).getDate() > 28) yield year;
  }
}

const leapYear = leapYears();

for (const item of leapYear) {
  console.log(item);
}

// console.log(leapYear.next()); // {value: 1904, done: false}
// console.log(leapYear.next()); // {value: 1908, done: false}
// console.log(leapYear.next()); // {value: 1912, done: false}
// console.log(leapYear.next()); // {value: 2000, done: true}

// Создать генератор-счетчик с динамическим интервалом. Начальное значение 0, интервал 1.

function* counter() {
  let i = -1;
  let increment = 1;
  let temp;
  while (true) {
    temp = yield (i = i + increment);
    if (temp !== void 0) increment = temp;
  }
}

const count = counter();

console.log(count.next()); // {value: 0, done: false}
console.log(count.next()); // {value: 1, done: false}
console.log(count.next(10)); // {value: 11, done: false}
console.log(count.next()); // {value: 21, done: false}
console.log(count.next()); // {value: 31, done: false}
console.log(count.next(100)); // {value: 131, done: false}

// Создать генератор четных чисел.

function* evensFunc(min = 2, max = Infinity) {
  for (let index = min; index < max; index += 2) {
    yield index;
  }
}

const even = evensFunc();

// for (const item of even) {
//   console.log(item);
// }

console.log(even.next()); // {value: 2, done: false}
console.log(even.next()); // {value: 4, done: false}
console.log(even.next()); // {value: 6, done: false}

// // Создать генератор случайных последовательностей четных чисел (используя генератор из пункта 3). Размер последовательности от 1 до 20 элементов.

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

function* randomEvens(min, max) {
  let from;
  let to;

  for (let i = 0; i < Infinity; i++) {
    to = getRandom(min, max);
    if (to % 2 !== 0) to = to + 1;
    console.log(`max:${to}`);

    from = getRandom(min, max);

    if (from > to) {
      do {
        from = getRandom(min, max);
      } while (from > to);
    }

    if (from % 2 !== 0) from = from + 1;
    console.log(`min:${from}`);

    if (from === to) to = to + 2;

    yield [...evensFunc(from, to)];
  }
}
const evens = randomEvens(2, 20);

console.log(evens.next()); // {value: [2, 4, 6], done: false}
console.log(evens.next()); // {value: [2, 4, 6, 8, 10], done: false}
console.log(evens.next()); // {value: [2], done: false}
