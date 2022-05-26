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
