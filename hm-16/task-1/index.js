///////////////// Task 1 /////////////////

// const APP = {
//   firsName() {
//     const validateFirstName = (input) => {
//       return input === null || input.length < 1 || input.length > 30;
//     };

//     const NAME_OF_USER = STDIN.string("Enter your first Name", validateFirstName, false);

//     return NAME_OF_USER;
//   },
//   lastName() {
//     const validateSurName = (input) => {
//       return input === null || input.length < 1 || input.length > 30;
//     };

//     const SURNAME_OF_USER = STDIN.string("Enter your surname", validateSurName, false);

//     return SURNAME_OF_USER;
//   },
//   age() {
//     const validateBirthYear = (value) => {
//       const input = Number(value);

//       return isNaN(input) || input < 1900 || input > 2022;
//     };

//     const YEAR_OF_BIRTH = STDIN.number("Enter your year of birth", validateBirthYear, false);

//     const validateBirthMonth = (value) => {
//       const input = Number(value);

//       return isNaN(input) || input < 1 || input > 12;
//     };

//     const MONTH_OF_BIRTH = STDIN.number("Enter your month of birth", validateBirthMonth, false);

//     const validateBirthDay = (value) => {
//       const input = Number(value);

//       return isNaN(input) || input < 1 || input > DATE.maxDays(YEAR_OF_BIRTH, MONTH_OF_BIRTH);
//     };

//     const DAY_OF_BIRTH = STDIN.number("Enter your day of birth", validateBirthDay, false);

//     const currentDate = DATE.getCurrentDate();
//     const [currentYear, currentMonth, currentDay] = currentDate;

//     let age = currentYear - YEAR_OF_BIRTH;
//     if (MONTH_OF_BIRTH > currentMonth || (MONTH_OF_BIRTH === currentMonth && DAY_OF_BIRTH > currentDay)) {
//       return age - 1;
//     } else return age;
//   },
// };

// const spans = document.getElementsByTagName("span");

// for (const span of spans) {
//   if (span.closest(".user-list")) {
//     if (span.innerHTML === "firstName") span.innerHTML = APP.firsName();
//     if (span.innerHTML === "lastName") span.innerHTML = APP.lastName();
//     if (span.innerHTML === "age") span.innerHTML = APP.age();
//   }
// }
