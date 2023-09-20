const express = require('express');
const router = express.Router();
const blog = require('../models/blog');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './blogimages')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.get('/', async(req, res) => {
    try{
        const blogs = await blog.find()
        res.json(blogs)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const Blog = await blog.findById(req.params.id)
        res.json(Blog)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const Blog = await blog.findById(req.params.id)
        Blog.title = req.body.title
        Blog.discription = req.body.discription
        Blog.publishdate = req.body.publishdate
        const b1 = await Blog.save()
        res.json(b1)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const Blog = await blog.deleteOne({_id: req.params.id})
        res.json(Blog)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.post('/', upload.single('blogImage'), async(req, res) => {
    console.log(req.file)
    const Blog = new blog({
        title: req.body.title,
        discription: req.body.discription,
        publishdate: req.body.publishdate,
        blogImage: req.file.path
    })
    try{
        const b1 = await Blog.save()
        res.json(b1)
    }
    catch(err){
        res.send('Error')
    }
})

module.exports = router

