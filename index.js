require('dotenv').config()

const server = require('./server.js');

const port = process.env.PORT || 4000;
const secret = process.env.SECRET_THING || 'foo';

console.log(port, secret)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


