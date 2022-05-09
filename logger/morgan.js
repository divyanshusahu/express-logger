const morganRequestFormat = (tokens, req, res) => {
  let log = {
    method: tokens["method"](req, res),
    date: tokens["date"](req, res, "iso"),
    referrer: tokens["referrer"](req, res),
    "remote-addr": tokens["remote-addr"](req, res),
    url: tokens["url"](req, res),
    "user-agent": tokens["user-agent"](req, res),
    message: "Request received",
  };
  return JSON.stringify(log);
};

const morganResponseFormat = (tokens, req, res) => {
  let log = {
    date: tokens["date"](req, res, "iso"),
    url: tokens["url"](req, res),
    status: tokens["status"](req, res),
    "response-time": `${tokens["total-time"](req, res)} ms`,
    message: "Request completed",
  };
  return JSON.stringify(log);
};

module.exports = {
  morganRequestFormat,
  morganResponseFormat,
};
