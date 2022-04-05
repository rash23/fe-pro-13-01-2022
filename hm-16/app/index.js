///////////////// Task 1 /////////////////

const STDIN = {
  number(message, validate, strict = true) {
    const data = prompt(message);

    if (strict && data === null) {
      return null;
    }

    return !validate(data) ? Number(data) : STDIN.number(message, validate, strict);
  },

  string(message, validate, strict = true) {
    const data = prompt(message);

    if (strict && data === null) {
      return null;
    }

    return !validate(data) ? String(data) : STDIN.string(message, validate, strict);
  },
};

const DATE = {
  isLeapYear(year) {
    let isLeapYear = new Date(year, 2, 0).getDate() > 28;

    return isLeapYear;
  },

  zodiac(month, day) {
    const horoscope = [
      ["Capricorn ♑", 20],
      ["Aquarius ♒", 19],
      ["Pisces ♓", 20],
      ["Aries ♈", 20],
      ["Taurus ♉", 21],
      ["Gemini ♊", 21],
      ["Cancer ♋", 22],
      ["Leo ♌", 21],
      ["Virgo ♍", 23],
      ["Libra ♎", 23],
      ["Scorpio ♏", 22],
      ["Sagittarius ♐", 22],
    ];

    return horoscope[month][1] >= day ? horoscope[month][0] : horoscope[month === 11 ? 0 : month + 1][0];
  },

  maxDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },

  getCurrentDate() {
    const now = new Date();

    return [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  },
};

const APP = {
  firsName() {
    const validateFirstName = (input) => {
      return input === null || input.length < 1 || input.length > 30;
    };

    const NAME_OF_USER = STDIN.string("Enter your first Name", validateFirstName, false);

    return NAME_OF_USER;
  },
  lastName() {
    const validateSurName = (input) => {
      return input === null || input.length < 1 || input.length > 30;
    };

    const SURNAME_OF_USER = STDIN.string("Enter your surname", validateSurName, false);

    return SURNAME_OF_USER;
  },
  age() {
    const validateBirthYear = (value) => {
      const input = Number(value);

      return isNaN(input) || input < 1900 || input > 2022;
    };

    const YEAR_OF_BIRTH = STDIN.number("Enter your year of birth", validateBirthYear, false);

    const validateBirthMonth = (value) => {
      const input = Number(value);

      return isNaN(input) || input < 1 || input > 12;
    };

    const MONTH_OF_BIRTH = STDIN.number("Enter your month of birth", validateBirthMonth, false);

    const validateBirthDay = (value) => {
      const input = Number(value);

      return isNaN(input) || input < 1 || input > DATE.maxDays(YEAR_OF_BIRTH, MONTH_OF_BIRTH);
    };

    const DAY_OF_BIRTH = STDIN.number("Enter your day of birth", validateBirthDay, false);

    const currentDate = DATE.getCurrentDate();
    const [currentYear, currentMonth, currentDay] = currentDate;

    let age = currentYear - YEAR_OF_BIRTH;
    if (MONTH_OF_BIRTH > currentMonth || (MONTH_OF_BIRTH === currentMonth && DAY_OF_BIRTH > currentDay)) {
      return age - 1;
    } else return age;
  },
};

const allSpans = (n) => {
  let arr = [];

  let children = n.children;

  for (let i = 0; i < children.length; i++) {
    if (children[i].tagName === "SPAN") {
      arr.push(children[i]);
    }

    if (children[i].children.length > 0) {
      arr.push(allSpans(children[i]));
    }
  }
  return arr.flat(Infinity);
};

const spans = allSpans(document.body);

for (const span of spans) {
  if (span.parentElement.tagName === "LI") {
    if (span.innerHTML === "firstName") span.innerHTML = APP.firsName();
    if (span.innerHTML === "lastName") span.innerHTML = APP.lastName();
    if (span.innerHTML === "age") span.innerHTML = APP.age();
  }
}

///////////////// Task 2 /////////////////

const arrFromTags = (n) => {
  let arr = [];

  let children = n.children;

  for (let i = 0; i < children.length; i++) {
    arr.push(children[i]);
    if (children[i].children.length > 0) {
      arr.push(arrFromTags(children[i]));
    }
  }
  return arr;
};

const arrTags = arrFromTags(document.body);

const countTags = (arr) => {
  let newArr = arr.flat(Infinity);

  arr = newArr.map((element) => {
    return element.tagName;
  });

  let resObj = arr.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let result = "";
  for (const key in resObj) {
    if (Object.hasOwnProperty.call(resObj, key)) {
      result += `<li>[${key}] - ${resObj[key]}</li>`;
    }
  }
  return result;
};

document.querySelector("ul.tag-list").innerHTML = countTags(arrTags);
