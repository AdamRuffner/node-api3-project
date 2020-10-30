const express = require('express');
const morgan = require('morgan')
const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(morgan('dev'))
server.use('/api/users', userRouter)
server.get('*', (req,res) => {
  res.status(404).json({ meesage: "not found" })
})


module.exports = server;
