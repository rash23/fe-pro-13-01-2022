// class MultiTool {
//   constructor(solidity) {
//     this.solidity = solidity;
//   }
//   cut() {
//     console.log("Вы использовали метод cut()");
//   }

//   slice() {
//     console.log("Вы использовали метод slice()");
//   }

//   screw() {
//     console.log("Вы использовали метод screw()");
//   }

//   view() {
//     this.solidity <= 0 ? console.error("Инструмент поломан") : console.log(`Прочность инструмента: ${this.solidity}`);
//   }
// }

class MultiTool {
  constructor(solidity, logger) {
    this.solidity = solidity;
    this.logger = logger;
  }

  cut(damage) {
    this.damage(damage);
    this.report("Вы использовали метод cut()");
  }

  slice(damage) {
    this.damage(damage);
    this.report("Вы использовали метод slice()");
  }

  screw(damage) {
    this.damage(damage);
    this.report("Вы использовали метод screw()");
  }

  damage(amount) {
    this.solidity -= amount;
  }

  report(message) {
    this.solidity <= 0 ? this.logger.error("Инструмент поломан") : this.logger.info(message, `Прочность инструмента: ${this.solidity}`);
  }
}

class ConsoleLogger {
  info(...messages) {
    console.log(...messages);
  }

  error(err) {
    console.error(err);
  }
}

class CheepMultiTool extends MultiTool {
  constructor() {
    super(100, new ConsoleLogger());
  }

  cut() {
    super.cut(10);
  }

  slice() {
    super.slice(15);
  }

  screw() {
    super.screw(20);
  }
}

// class CheepMultiTool extends MultiTool {
//   constructor() {
//     super(100);
//   }
//   cut() {
//     super.cut();
//     this.solidity = this.solidity - 10;
//     return super.view();
//   }

//   slice() {
//     super.slice();
//     this.solidity = this.solidity - 15;
//     return super.view();
//   }
//   screw() {
//     super.screw();
//     this.solidity = this.solidity - 20;
//     return super.view();
//   }
// }

const toolOne = new CheepMultiTool();

toolOne.cut();
toolOne.slice();
toolOne.screw();
toolOne.cut();
toolOne.screw();
toolOne.screw();
toolOne.cut();

// class ExpensiveMultiTool extends MultiTool {
//   constructor() {
//     super(250);
//   }
//   cut() {
//     super.cut();
//     this.solidity = this.solidity - 5;
//     return super.view();
//   }

//   slice() {
//     super.slice();
//     this.solidity = this.solidity - 5;
//     return super.view();
//   }
//   screw() {
//     super.screw();
//     this.solidity = this.solidity - 5;
//     return super.view();
//   }

//   drill() {
//     console.log("Вы использовали метод drill()");
//     this.solidity = this.solidity - 10;
//     return super.view();
//   }
// }

class ExpensiveMultiTool extends MultiTool {
  constructor() {
    super(250, new ConsoleLogger());
  }

  cut() {
    super.cut(5);
  }

  slice() {
    super.slice(5);
  }

  screw() {
    super.screw(5);
  }

  drill() {
    this.damage(10);
    super.report("Вы использовали метод drill()");
  }
}

const toolTwo = new ExpensiveMultiTool();

toolTwo.drill();
toolTwo.screw();
toolTwo.slice();
toolTwo.cut();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
toolTwo.drill();
