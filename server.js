const express = require('express')
// const Router = require('./Blog/user')
// const Blogs = require('./Blog/blog');

const Blog = require('./Blog/blog.js');
const Comments = require('./Blog/comments.js');

const server = express();


// middleware
server.use(express.json());

server.use('/api/comments', Comments);
server.use('/db', Blog);

server.get('/', (req, res) => {
    res.send(`
    <h1>Test</h1>
    `);
})



module.exports = server;