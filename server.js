const express = require('express')

// const Blogs = require('./Blog/blog');

const DBRouter = require('./Blog/blog.js');
const server = express();



// middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h1>Test</h1>
    `);
})


server.use('/db', DBRouter);
module.exports = server;