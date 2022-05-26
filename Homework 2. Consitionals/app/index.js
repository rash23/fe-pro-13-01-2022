var CURRENT_YEAR = 2022;
var dayOfBirth = Number(prompt("Please enter your day of birth:"));
var monthOfBirth = Number(prompt("Please enter your month of birth:"));
var yearOfBirth = Number(prompt("Please enter your year of birth:"));
var nameOfUser = prompt("Please enter your name:");
var surnameOfUser = prompt("Please enter your surname:");
var ageOfUser = CURRENT_YEAR - yearOfBirth;
var zodiacOfUser;
var isLeapYear;

if (yearOfBirth % 400 === 0 || (yearOfBirth % 100 !== 0 && yearOfBirth % 4 === 0)) {
  isLeapYear = true;
} else {
  isLeapYear = false;
}

// Решение с помощью switch/case

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

// Решение с помощью if/else

// if (monthOfBirth === 1) {
//   if (dayOfBirth <= 19)
//     zodiacOfUser = 'Capricorn  ♑';
//   else
//     zodiacOfUser = 'Aquarius ♒';
// };

// if (monthOfBirth === 2) {
//   if (dayOfBirth <= 18)
//     zodiacOfUser = 'Aquarius ♒';
//   else
//     zodiacOfUser = 'Pisces ♓';
// };

// if (monthOfBirth === 3) {
//   if (dayOfBirth <= 20)
//     zodiacOfUser = 'Pisces ♓';
//   else
//     zodiacOfUser = 'Aries ♈';
// };

// if (monthOfBirth === 4) {
//   if (dayOfBirth <= 19)
//     zodiacOfUser = 'Aries ♈';
//   else
//     zodiacOfUser = 'Taurus ♉';
// };

// if (monthOfBirth === 5) {
//   if (dayOfBirth <= 20)
//     zodiacOfUser = 'Taurus ♉';
//   else
//     zodiacOfUser = 'Gemini ♊';
// };

// if (monthOfBirth === 6) {
//   if (dayOfBirth <= 21)
//     zodiacOfUser = 'Gemini ♊';
//   else
//     zodiacOfUser = 'Cancer ♋';
// };

// if (monthOfBirth === 7) {
//   if (dayOfBirth <= 22)
//     zodiacOfUser = 'Cancer ♋';
//   else
//     zodiacOfUser = 'Leo ♌';
// };

// if (monthOfBirth === 8) {
//   if (dayOfBirth <= 22)
//     zodiacOfUser = 'Leo ♌';
//   else
//     zodiacOfUser = 'Virgo ♍';
// };

// if (monthOfBirth === 9) {
//   if (dayOfBirth <= 22)
//     zodiacOfUser = 'Virgo ♍';
//   else
//     zodiacOfUser = 'Libra ♎';
// };

// if (monthOfBirth === 10) {
//   if (dayOfBirth <= 22)
//     zodiacOfUser = 'Libra ♎';
//   else
//     zodiacOfUser = 'Scorpio ♏';
// };

// if (monthOfBirth === 11) {
//   if (dayOfBirth <= 22)
//     zodiacOfUser = 'Scorpio ♏';
//   else
//     zodiacOfUser = 'Sagittarius ♐';
// };

// if (monthOfBirth === 12) {
//   if (dayOfBirth <= 21)
//     zodiacOfUser = 'Sagittarius ♐';
//   else
//     zodiacOfUser = 'Capricorn  ♑';
// };

document.write(
  "User Bio: " + nameOfUser + " " + surnameOfUser + ", " + ageOfUser + " years old" + (isLeapYear ? " (leap year)," : ",") + " " + zodiacOfUser + ";"
);
