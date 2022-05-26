const warehouse = {
  gadgets: [
    { id: 1, title: "Apple IPad Pro", price: 2000 },
    { id: 2, title: "Lenovo IdeaPad", price: 1000 },
  ],
  sport: [
    { id: 1, title: "Fitness PRO", price: 500 },
    { id: 2, title: "Nike x200", price: 400 },
  ],
  kids: [
    { id: 1, title: "Lego Builder", price: 100 },
    { id: 2, title: "Pokemon X", price: 200 },
  ],
};

const makeWarehouseIterable = (obj) => {
  return {
    ...obj,
    [Symbol.iterator]() {
      let i = 0;
      const entries = Object.entries(this);

      return {
        next() {
          const entry = entries[i++];
          return {
            value: entry && [entry[0], entry[1].reduce((total, { price }) => (total += price), 0)],
            done: !entry,
          };
        },
      };
    },
  };
};

const iterableWarehouse = makeWarehouseIterable(warehouse);

for (const iterator of iterableWarehouse) {
  console.log(iterator[0]); // gadgets ... sports ... kids
  console.log(iterator[1]); // 3000 ... 900 ... 300
}

const categories = [...iterableWarehouse]; // [['gadgets', 3000], ['sports', 900], ['kids', 300]]

console.log(categories);
