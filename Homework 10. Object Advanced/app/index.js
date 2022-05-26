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
};

const archiveFabric = () => {
  const archive = [];

  return {
    add(item) {
      archive.push(item);
      console.log(archive);
    },
    delete(index) {
      return archive.splice(index, 1);
    },
    find(item) {
      archive.find((value) => {
        return item === value;
      });
    },
    filter(callback) {
      archive.filter(callback);
    },
    each(callback) {
      archive.forEach(callback);
    },
    take(from, to) {
      const res = archive.slice(from, to);
      console.log(res);
      return res;
    },
    isEmpty() {
      return archive.length === 0;
    },
    count() {
      return archive.length;
    },
  };
};

const getCurrentDate = function () {
  const now = new Date();

  return [now.getFullYear(), now.getMonth() + 1, now.getDate()];
};

const employeeFabric = (firstName, lastName, year, month, day) => {
  const Employee = {
    firstName,
    lastName,
    year,
    month,
    day,
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    get age() {
      const currentDate = getCurrentDate();
      const [CurrentYear, CurrentMonth, CurrentDay] = currentDate;

      if (CurrentMonth >= month && CurrentDay >= day) {
        return CurrentYear - year;
      } else return CurrentYear - year - 1;
    },
  };

  return Employee;
};

const APP = {
  archive: archiveFabric(),

  run() {
    const ALLOWED_OPERATIONS = ["EXIT", "ADD", "DELETE", "SHOW_ALL"];
    let operation;
    do {
      do {
        operation = prompt("Enter some operation (EXIT, ADD, DELETE, SHOW_ALL)");
      } while (ALLOWED_OPERATIONS.indexOf(operation) === -1);

      switch (operation) {
        case "ADD":
          this.addEntry();
          break;

        case "DELETE":
          this.deleteEntry();
          break;

        case "SHOW_ALL":
          this.showEntries();
          break;
      }
      if (operation === "EXIT") break;
    } while (confirm("Do you want to do another operation"));
    this.exit();
  },

  exit() {
    return console.log("Buy, Buy! See you later!");
  },

  addEntry() {
    do {
      const validateBirthYear = (value) => {
        const input = Number(value);

        return isNaN(input) || input < 1900 || input > 2022;
      };

      const YEAR_OF_BIRTH = STDIN.number("Enter your year of birth", validateBirthYear, false);

      const validateBirthMonth = (value) => {
        const input = Number(value);

        return isNaN(input) || input < 1 || input > 12;
      };

      const MONTH_OF_BIRTH = STDIN.number("Enter your month of birth", validateBirthMonth, false) - 1;

      const validateBirthDay = (value) => {
        const input = Number(value);

        return isNaN(input) || input < 1 || input > DATE.maxDays(YEAR_OF_BIRTH, MONTH_OF_BIRTH);
      };

      const DAY_OF_BIRTH = STDIN.number("Enter your day of birth", validateBirthDay, false);

      const validateFirstName = (input) => {
        return input === null || input.length < 1 || input.length > 30;
      };

      const NAME_OF_USER = STDIN.string("Enter your first Name", validateFirstName, false);

      const validateSurName = (input) => {
        return input === null || input.length < 1 || input.length > 30;
      };

      const SURNAME_OF_USER = STDIN.string("Enter your surname", validateSurName, false);

      const leapYear = DATE.isLeapYear(YEAR_OF_BIRTH);

      const ZODIAC = DATE.zodiac(MONTH_OF_BIRTH, DAY_OF_BIRTH);

      const employee = employeeFabric(NAME_OF_USER, SURNAME_OF_USER, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH);

      console.log(employee);

      this.archive.add(employee);
      const length = this.archive.count();

      console.log(`New empoloyee add successfully`);
      console.log(`FullName: ${employee.fullName}`);
      console.log(`age: ${employee.age}`);
      console.log(`zodiac: ${ZODIAC}`);
      console.log(`leap year: ${leapYear}`);

      if (length <= 1) console.log(`There is ${length} user in the archive`);
      else {
        console.log(`There are ${length} users in the archive`);
      }
    } while (confirm("Do you want to add one more user?"));
  },

  deleteEntry() {
    const length = this.archive.count();

    if (!length) {
      return console.log("EMPTY ARCHIVE");
    }

    const validate = (value) => {
      return value === null || /\D/.test(value) || value < 0 || value > length - 1;
    };

    const index = STDIN.string(`Enter index to be deleted: min 0, max ${length - 1}`, validate, false);

    let deleteUserArr = this.archive.delete(index);
    let deleteUser = deleteUserArr[0];
    console.log(deleteUser);

    console.log(`User: ${deleteUser.firstName} ${deleteUser.lastName} deleted successfully`);

    if (length - 1 <= 1) console.log(`There is ${length - 1} user in the archive`);
    else {
      console.log(`There are ${length - 1} users in the archive`);
    }
  },
  showEntries() {
    const isEmpty = this.archive.isEmpty();

    if (isEmpty) {
      return console.log("EMPTY ARCHIVE");
    } else {
      this.archive.each((element) => {
        console.log(element);
      });
    }
  },
};

APP.run();
