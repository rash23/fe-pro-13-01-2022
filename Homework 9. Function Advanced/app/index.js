const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const wrap = function (depth, value) {
  return depth > 0 ? wrap(--depth, { value }) : value;
};

const random = getRandomInt(5, 10);
console.log(`Random: ${random}`);

const wrappedObject = wrap(random, "$");
console.log(wrappedObject);

// function unwrap(target) {
//   return target.value !== null && typeof target.value === "object" && !Array.isArray(target.value) ? unwrap(target.value) : target.value;
// }

function unwrap(target, key) {
  return target[key] !== null && typeof target[key] === "object" && !Array.isArray(target[key]) ? unwrap(target[key], key) : target[key];
}

const result = unwrap(wrappedObject, "value");
console.log(result);
