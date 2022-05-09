const appRoot = require("app-root-path");
const winston = require("winston");
const httpContext = require("express-http-context");

const transportsConfig = {
  app: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
  },
  error: {
    level: "error",
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
  },
  console: {
    level: "info",
    handleExceptions: true,
    json: true,
  },
};

const customFormatter = winston.format.printf(({ level, message }) => {
  try {
    message = JSON.parse(message);
  } catch {
    message = {
      message: message,
    };
  }
  let l = {
    level: level,
  };
  let traceID = httpContext.get("Trace-ID");
  message["trace-id"] = traceID;
  let log = { ...l, ...message };
  return JSON.stringify(log);
});

const logger = winston.createLogger({
  format: winston.format.combine(customFormatter),
  transports: [
    new winston.transports.File(transportsConfig.app),
    new winston.transports.File(transportsConfig.error),
    new winston.transports.Console(transportsConfig.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
