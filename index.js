const express = require("express");
const morgan = require("morgan");
const httpContext = require("express-http-context");

const {
  logger,
  morganRequestFormat,
  morganResponseFormat,
  setTraceID,
} = require("./logger");
const { sum } = require("./utils");

const app = express();

// middlewares
app.use(httpContext.middleware);
app.use(setTraceID);
app.use(
  morgan(morganRequestFormat, { stream: logger.stream, immediate: true })
);
app.use(morgan(morganResponseFormat, { stream: logger.stream }));

app.get("/", (req, res) => {
  res.send(`Healthy ${sum(1, 2)}`);
});

app.listen(3000);
