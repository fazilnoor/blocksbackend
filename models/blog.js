const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    publishdate: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('blog', blogSchema)