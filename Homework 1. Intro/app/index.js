const CURRENT_YEAR = 2022;
let yearOfBirth = prompt('Please enter your year of birth:');
let nameOfUser = prompt('Please enter your name:');
let surnameOfUser = prompt('Please enter your surname:');

// document.write('User Bio: ' + nameOfUser + ' ' + surnameOfUser + ', ' + (CURRENT_YEAR - Number(yearOfBirth)) + ' years old;');
document.write(`User Bio: ${nameOfUser} ${surnameOfUser}, ${(CURRENT_YEAR - Number(yearOfBirth))} years old;`);