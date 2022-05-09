const logger = require("./winston");
const { morganRequestFormat, morganResponseFormat } = require("./morgan");
const { setTraceID } = require("./traceid")

module.exports = {
  logger,
  morganRequestFormat,
  morganResponseFormat,
  setTraceID
};
