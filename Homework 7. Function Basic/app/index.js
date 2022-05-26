const getAddress = function (postcode, city, country, street, number, fraction) {
  const Address = {
    postcode: String(postcode),
    city: String(city).toLowerCase(),
    country: String(country).toLowerCase(),
    street: String(street).toLowerCase(),
    number: parseInt(number),
  };
  if (!isNaN(Address.fraction)) {
    Address.fraction = parseInt(fraction);
  }

  return Address;
};

const address = getAddress("02000", "Kyiv", "Ukraine", "Khreshatyk", 17);
console.log(address);

const capitalize = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "string") {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }
  return arr;
};

const addressToString = function (obj) {
  const postcode = 0;
  const city = 1;
  const country = 2;
  const street = 3;
  const number = 4;
  const fraction = 5;

  const arrayAddress = Object.values(obj);

  capitalize(arrayAddress);

  if (typeof arrayAddress[fraction] === "undefined") {
    return `${arrayAddress[street]} St, ${arrayAddress[number]} @ ${arrayAddress[postcode]}, ${arrayAddress[city]}, ${arrayAddress[country]}.`;
  } else {
    return `${arrayAddress[street]} St, ${arrayAddress[number]}/${arrayAddress[fraction]} @ ${arrayAddress[postcode]}, ${arrayAddress[city]}, ${arrayAddress[country]}.`;
  }
};

const stringAddress = addressToString(address);

const deleteItem = function (arr, index) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      result.push(arr[i]);
    }
  }
  return result;
};

const parser = function (string) {
  const findData = string.match(/\w+/g);

  let newArr = deleteItem(findData, 1);

  console.log(newArr);

  let street, number, fraction, postcode, city, country;

  switch (newArr.length) {
    case 5:
      street = 0;
      number = 1;
      postcode = 2;
      city = 3;
      country = 4;
      fraction = 5;
      break;

    case 6:
      street = 0;
      number = 1;
      fraction = 2;
      postcode = 3;
      city = 4;
      country = 5;
      break;
  }

  return getAddress(newArr[postcode], newArr[city], newArr[country], newArr[street], newArr[number], newArr[fraction]);
};

console.log(parser(stringAddress));
