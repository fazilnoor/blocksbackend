const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/blogs';
const cors = require('cors')

const app = express()

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

app.use(express.json())

app.use('/blogimages', express.static('blogimages'));

app.use(cors({
    origin: '*'
}))

const blogsRouter = require('./routers/blogs')

app.use('/blogs', blogsRouter)

con.on('open', () => {
    console.log('connection is wroking......')
})

app.listen(8000)