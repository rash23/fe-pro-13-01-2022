const USERS = [];
const ALLOWED_OPERATIONS = ["EXIT", "ADD", "DELETE", "SHOW_ALL"];
const CURRENT_YEAR = 2022;
let operation;
const user = [];
const min_birthYear = 1900;
const max_birthYear = CURRENT_YEAR;
const YEAR_OF_BIRTH = 0;
const MONTH_OF_BIRTH = 1;
const DAY_OF_BIRTH = 2;
const NAME_OF_USER = 3;
const SURNAME_OF_USER = 4;
const ZODIAC = 5;
const ZODIAC_SIGN = 6;
let repeat;

main: do {
  do {
    operation = prompt("Enter some operation (EXIT, ADD, DELETE, SHOW_ALL)");
  } while (ALLOWED_OPERATIONS.indexOf(operation) === -1);

  switch (operation) {
    case "ADD":
      do {
        do {
          user[YEAR_OF_BIRTH] = Number(prompt(`Enter your birthday year: only integers, min ${min_birthYear}, max ${max_birthYear}`));
        } while (user[YEAR_OF_BIRTH] < min_birthYear || user[YEAR_OF_BIRTH] > max_birthYear || isNaN(user[YEAR_OF_BIRTH]));

        const min_monthOfBirth = 1;
        const max_monthOfBirth = 12;

        do {
          user[MONTH_OF_BIRTH] = Number(prompt(`Enter your month of birth: only integers, min ${min_monthOfBirth}, max ${max_monthOfBirth}`));
        } while (user[MONTH_OF_BIRTH] < min_monthOfBirth || user[MONTH_OF_BIRTH] > max_monthOfBirth || isNaN(user[MONTH_OF_BIRTH]));

        const min_dayOfBirth = 1;
        let max_dayOfBirth;
        let isLeapYear;

        if (user[YEAR_OF_BIRTH] % 400 === 0 || (user[YEAR_OF_BIRTH] % 100 !== 0 && user[YEAR_OF_BIRTH] % 4 === 0)) {
          isLeapYear = true;
        } else {
          isLeapYear = false;
        }

        switch (user[MONTH_OF_BIRTH]) {
          case 1:
            max_dayOfBirth = 31;
            break;

          case 2:
            if (isLeapYear) max_dayOfBirth = 29;
            else max_dayOfBirth = 28;
            break;

          case 3:
            max_dayOfBirth = 31;
            break;

          case 4:
            max_dayOfBirth = 30;
            break;

          case 5:
            max_dayOfBirth = 31;
            break;

          case 6:
            max_dayOfBirth = 30;
            break;

          case 7:
            max_dayOfBirth = 31;
            break;

          case 8:
            max_dayOfBirth = 31;
            break;

          case 9:
            max_dayOfBirth = 30;
            break;

          case 10:
            max_dayOfBirth = 31;
            break;

          case 11:
            max_dayOfBirth = 30;
            break;

          case 12:
            max_dayOfBirth = 31;
            break;
        }

        do {
          user[DAY_OF_BIRTH] = Number(prompt(`Enter your day of birth: only integers, min ${min_dayOfBirth}, max ${max_dayOfBirth}`));
        } while (user[DAY_OF_BIRTH] < min_dayOfBirth || user[DAY_OF_BIRTH] > max_dayOfBirth || isNaN(user[DAY_OF_BIRTH]));

        const min_nameOfUser = 1;
        const max_nameOfUser = 20;

        do {
          user[NAME_OF_USER] = prompt(`Enter your name: min length: ${min_nameOfUser}, max length: ${max_nameOfUser}`);
        } while (user[NAME_OF_USER] === null || user[NAME_OF_USER].length < min_nameOfUser || user[NAME_OF_USER].length > max_nameOfUser);

        const min_surnameOfUser = 1;
        const max_surnameOfUser = 30;

        do {
          user[SURNAME_OF_USER] = prompt(`Enter your surname: min length: ${min_surnameOfUser}, max length: ${max_surnameOfUser}`);
        } while (user[SURNAME_OF_USER] === null || user[SURNAME_OF_USER].length < min_surnameOfUser || user[SURNAME_OF_USER].length > max_surnameOfUser);

        switch (MONTH_OF_BIRTH) {
          case 1:
            if (user[DAY_OF_BIRTH] <= 19) {
              user[ZODIAC] = "Capricorn";
              user[ZODIAC_SIGN] = "♑";
            } else {
              user[ZODIAC] = "Aquarius";
              user[ZODIAC_SIGN] = "♒";
            }
            break;

          case 2:
            if (user[DAY_OF_BIRTH] <= 18) {
              user[ZODIAC] = "Aquarius";
              user[ZODIAC_SIGN] = "♒";
            } else {
              user[ZODIAC] = "Pisces";
              user[ZODIAC_SIGN] = "♓";
            }
            break;

          case 3:
            if (user[DAY_OF_BIRTH] <= 20) {
              user[ZODIAC] = "Pisces";
              user[ZODIAC_SIGN] = "♓";
            } else {
              user[ZODIAC] = "Aries";
              user[ZODIAC_SIGN] = "♈";
            }
            break;

          case 4:
            if (user[DAY_OF_BIRTH] <= 19) {
              user[ZODIAC] = "Aries";
              user[ZODIAC_SIGN] = "♈";
            } else {
              user[ZODIAC] = "Taurus";
              user[ZODIAC_SIGN] = "♉";
            }
            break;

          case 5:
            if (user[DAY_OF_BIRTH] <= 20) {
              user[ZODIAC] = "Taurus";
              user[ZODIAC_SIGN] = "♉";
            } else {
              user[ZODIAC] = "Gemini";
              user[ZODIAC_SIGN] = "♊";
            }
            break;

          case 6:
            if (user[DAY_OF_BIRTH] <= 21) {
              user[ZODIAC] = "Gemini";
              user[ZODIAC_SIGN] = "♊";
            } else {
              user[ZODIAC] = "Cancer";
              user[ZODIAC_SIGN] = "♋";
            }
            break;

          case 7:
            if (user[DAY_OF_BIRTH] <= 22) {
              user[ZODIAC] = "Cancer";
              user[ZODIAC_SIGN] = "♋";
            } else {
              user[ZODIAC] = "Leo";
              user[ZODIAC_SIGN] = "♌";
            }
            break;

          case 8:
            if (user[DAY_OF_BIRTH] <= 22) {
              user[ZODIAC] = "Leo";
              user[ZODIAC_SIGN] = "♌";
            } else {
              user[ZODIAC] = "Virgo";
              user[ZODIAC_SIGN] = "♍";
            }
            break;

          case 9:
            if (user[DAY_OF_BIRTH] <= 22) {
              user[ZODIAC] = "Virgo";
              user[ZODIAC_SIGN] = "♍";
            } else {
              user[ZODIAC] = "Libra";
              user[ZODIAC_SIGN] = "♎";
            }
            break;

          case 10:
            if (user[DAY_OF_BIRTH] <= 22) {
              user[ZODIAC] = "Libra";
              user[ZODIAC_SIGN] = "♎";
            } else {
              user[ZODIAC] = "Scorpio";
              user[ZODIAC_SIGN] = "♏";
            }
            break;

          case 11:
            if (user[DAY_OF_BIRTH] <= 22) {
              user[ZODIAC] = "Scorpio";
              user[ZODIAC_SIGN] = "♏";
            } else {
              user[ZODIAC] = "Sagittarius";
              user[ZODIAC_SIGN] = "♐";
            }
            break;

          case 12:
            if (user[DAY_OF_BIRTH] <= 21) {
              user[ZODIAC] = "Sagittarius";
              user[ZODIAC_SIGN] = "♐";
            } else {
              user[ZODIAC] = "Capricorn";
              user[ZODIAC_SIGN] = "♑";
            }
            break;
        }

        USERS.push(user);
        console.log(user);
      } while (confirm("Do you want to add one more user?"));
      console.log(USERS);
      break;

    case "DELETE":
      let deleteIndex;
      if (USERS.length !== 0) {
        do {
          deleteIndex = prompt(`Enter index of user you want to delete (min: 0, max: ${USERS.length - 1})`);
        } while (deleteIndex === null || /\D/.test(deleteIndex) || Number(deleteIndex) < 0 || Number(deleteIndex) > USERS.length - 1);

        let deleteUserArr = USERS.splice(Number(deleteIndex), 1);
        let deleteUser = deleteUserArr[0];

        console.log(`User: ${deleteUser[4]} ${deleteUser[5]} deleted successfully`);

        if (USERS.length <= 1) console.log(`There is ${USERS.length} user in the archive`);
        else {
          console.log(`There are ${USERS.length} users in the archive`);
        }
      } else {
        console.log("Sorry, your array is empty");
      }
      break;

    case "SHOW_ALL":
      if (USERS.length !== 0) {
        for (let i = 0; i < USERS.length; i++) {
          console.log(`User ${i}: ${USERS[i][4]} ${USERS[i][5]}, ${CURRENT_YEAR - USERS[i][0]} years old${USERS[i][1] ? " (is leap year)," : ","} ${USERS[i][6]} ${USERS[i][7]}; \r\n`);
        }
      } else {
        console.log("Sorry, your array is empty");
      }
      break;
  }
  repeat = confirm("Do you want to do another operation?");
  if (operation === "EXIT" || repeat === false) {
    console.log("Buy, Buy! See you later!");
    break main;
  }
} while (repeat);
