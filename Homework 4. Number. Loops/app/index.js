const CURRENT_YEAR = 2022;
let yearOfBirth = null;
let monthOfBirth = null;
let dayOfBirth = null;
let nameOfUser;
let surnameOfUser;
let zodiacOfUser;
let output = "";

do {
  const min_birthYear = 1900;
  const max_birthYear = CURRENT_YEAR;

  do {
    const input = Number(prompt(`Enter your birthday year: only integers, min ${min_birthYear}, max ${max_birthYear}`));
    yearOfBirth = input;
  } while (yearOfBirth < min_birthYear || yearOfBirth > max_birthYear || isNaN(yearOfBirth));

  let ageOfUser = CURRENT_YEAR - yearOfBirth;

  const min_monthOfBirth = 1;
  const max_monthOfBirth = 12;

  do {
    const input = Number(prompt(`Enter your month of birth: only integers, min ${min_monthOfBirth}, max ${max_monthOfBirth}`));
    monthOfBirth = input;
  } while (monthOfBirth < min_monthOfBirth || monthOfBirth > max_monthOfBirth || isNaN(monthOfBirth));

  const min_dayOfBirth = 1;
  let max_dayOfBirth;
  let isLeapYear;

  if (yearOfBirth % 400 === 0 || (yearOfBirth % 100 !== 0 && yearOfBirth % 4 === 0)) {
    isLeapYear = true;
  } else {
    isLeapYear = false;
  }

  switch (monthOfBirth) {
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
    const input = Number(prompt(`Enter your day of birth: only integers, min ${min_dayOfBirth}, max ${max_dayOfBirth}`));
    dayOfBirth = input;
  } while (dayOfBirth < min_dayOfBirth || dayOfBirth > max_dayOfBirth || isNaN(dayOfBirth));

  const min_nameOfUser = 1;
  const max_nameOfUser = 20;

  do {
    nameOfUser = prompt(`Enter your name: only string, min length: ${min_nameOfUser}, max length: ${max_nameOfUser}`);
  } while (nameOfUser === null || nameOfUser.length < min_nameOfUser || nameOfUser.length > max_nameOfUser);

  const min_surnameOfUser = 1;
  const max_surnameOfUser = 30;

  do {
    surnameOfUser = prompt(`Enter your surname: only string,  min length: ${min_surnameOfUser}, max length: ${max_surnameOfUser}`);
  } while (surnameOfUser === null || surnameOfUser.length < min_surnameOfUser || surnameOfUser.length > max_surnameOfUser);

  switch (monthOfBirth) {
    case 1:
      if (dayOfBirth <= 19) zodiacOfUser = "Capricorn  ♑";
      else zodiacOfUser = "Aquarius ♒";
      break;

    case 2:
      if (dayOfBirth <= 18) zodiacOfUser = "Aquarius ♒";
      else zodiacOfUser = "Pisces ♓";
      break;

    case 3:
      if (dayOfBirth <= 20) zodiacOfUser = "Pisces ♓";
      else zodiacOfUser = "Aries ♈";
      break;

    case 4:
      if (dayOfBirth <= 19) zodiacOfUser = "Aries ♈";
      else zodiacOfUser = "Taurus ♉";
      break;

    case 5:
      if (dayOfBirth <= 20) zodiacOfUser = "Taurus ♉";
      else zodiacOfUser = "Gemini ♊";
      break;

    case 6:
      if (dayOfBirth <= 21) zodiacOfUser = "Gemini ♊";
      else zodiacOfUser = "Cancer ♋";
      break;

    case 7:
      if (dayOfBirth <= 22) zodiacOfUser = "Cancer ♋";
      else zodiacOfUser = "Leo ♌";
      break;

    case 8:
      if (dayOfBirth <= 22) zodiacOfUser = "Leo ♌";
      else zodiacOfUser = "Virgo ♍";
      break;

    case 9:
      if (dayOfBirth <= 22) zodiacOfUser = "Virgo ♍";
      else zodiacOfUser = "Libra ♎";
      break;

    case 10:
      if (dayOfBirth <= 22) zodiacOfUser = "Libra ♎";
      else zodiacOfUser = "Scorpio ♏";
      break;

    case 11:
      if (dayOfBirth <= 22) zodiacOfUser = "Scorpio ♏";
      else zodiacOfUser = "Sagittarius ♐";
      break;

    case 12:
      if (dayOfBirth <= 21) zodiacOfUser = "Sagittarius ♐";
      else zodiacOfUser = "Capricorn  ♑";
      break;
  }
  document.write(`<p>User Bio: ${nameOfUser} ${surnameOfUser}, ${ageOfUser} years old${isLeapYear ? " (leap year)," : ","} ${zodiacOfUser};</p>`);
  console.log(`User Bio: ${nameOfUser} ${surnameOfUser}, ${ageOfUser} years old${isLeapYear ? " (leap year)," : ","} ${zodiacOfUser}; \r\n`);
} while (confirm("Do you want to repeat?"));
