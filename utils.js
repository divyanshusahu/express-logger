const logger = require("./logger/winston");

const sum = (a, b) => {
  logger.info(`a: ${a} and b: ${b}`);
  return a + b;
};

module.exports = { sum };
