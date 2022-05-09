const { v4: uuidv4 } = require("uuid");
const httpContext = require("express-http-context");

const setTraceID = (req, res, next) => {
  let uuid = uuidv4();
  res.set({ "Trace-ID": uuid });
  httpContext.set("Trace-ID", uuid);
  next();
};

module.exports = { setTraceID };
