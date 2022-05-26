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
