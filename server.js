const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(logger)

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}



module.exports = server;
