const randomString = prompt("Enter some string:");
const idNumber = Number(prompt("Enter ID: (from 1 to 4)"));
let userIndex;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomInt = getRandomIntInclusive(0, 2);

switch (idNumber) {
  case 1:
    userIndex = Number(prompt('Enter the index of the symbol which "Unicode" you want to know:'));
    console.log(`Your symbol: ${randomString[userIndex]}, Unicode: ${randomString.charCodeAt(userIndex)}`);
    break;

  case 2:
    userIndex = Number(prompt("Enter the index of the symbol you want to delete:"));

    console.log(randomString.slice(0, userIndex) + randomString.slice(userIndex + 1));
    break;

  case 3:
    userIndex = Number(prompt("Enter the index of the symbol you want to change to some emoji:"));

    let newString;

    if (randomInt === 0) newString = randomString.slice(0, userIndex) + "🙂" + randomString.slice(userIndex + 1);
    else if (randomInt === 1) newString = randomString.slice(0, userIndex) + "😎" + randomString.slice(userIndex + 1);
    else if (randomInt === 2) newString = randomString.slice(0, userIndex) + "🤠" + randomString.slice(userIndex + 1);
    else if (randomInt === 3) newString = randomString.slice(0, userIndex) + "😑" + randomString.slice(userIndex + 1);
    else if (randomInt === 4) newString = randomString.slice(0, userIndex) + "🤢" + randomString.slice(userIndex + 1);
    else if (randomInt === 5) newString = randomString.slice(0, userIndex) + "🥱" + randomString.slice(userIndex + 1);
    else if (randomInt === 6) newString = randomString.slice(0, userIndex) + "🥵" + randomString.slice(userIndex + 1);
    else if (randomInt === 7) newString = randomString.slice(0, userIndex) + "😡" + randomString.slice(userIndex + 1);
    else if (randomInt === 8) newString = randomString.slice(0, userIndex) + "🤓" + randomString.slice(userIndex + 1);
    else if (randomInt === 9) newString = randomString.slice(0, userIndex) + "😇" + randomString.slice(userIndex + 1);
    else if (randomInt === 10) newString = randomString.slice(0, userIndex) + "😷" + randomString.slice(userIndex + 1);

    console.log(newString);

    // решение с помощью методов массивов split и join
    // let arr = randomString.split('');

    // if (randomInt === 0) arr[userIndex] = '🙂';
    // else if (randomInt === 1) arr[userIndex] = '😎';
    // else if (randomInt === 2) arr[userIndex] = '🤠';
    // else if (randomInt === 3) arr[userIndex] = '😑';
    // else if (randomInt === 4) arr[userIndex] = '🤢';
    // else if (randomInt === 5) arr[userIndex] = '🥱';
    // else if (randomInt === 6) arr[userIndex] = '🥵';
    // else if (randomInt === 7) arr[userIndex] = '😡';
    // else if (randomInt === 8) arr[userIndex] = '🤓';
    // else if (randomInt === 9) arr[userIndex] = '😇';
    // else if (randomInt === 10) arr[userIndex] = '😷';

    // newString = arr.join('');
    // console.log(newString);
    break;

  case 4:
    // const stringLenght = randomString.split(' ').join('').length; решение с помощью методов массивов split и join
    const stringLenght = randomString.replace(/\s+/g, "").length;
    console.log(`Number of symbols in the string: ${stringLenght}`);
    break;
}

randomString.slice(0, userIndex) + "🙂" + randomString.slice(userIndex + 1);
