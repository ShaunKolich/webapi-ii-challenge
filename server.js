const express = require('express')
// const Router = require('./Blog/user')
// const Blogs = require('./Blog/blog');

const DBRouter = require('./Blog/blog.js');
const server = express();
const Comments = require('./Blog/user')



// middleware
server.use(express.json());
server.use('/api/posts', Comments);

server.get('/', (req, res) => {
    res.send(`
    <h1>Test</h1>
    `);
})


server.use('/db', DBRouter);
module.exports = server;