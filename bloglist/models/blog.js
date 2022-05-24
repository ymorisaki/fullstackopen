const mongoose = require('mongoose');
const config = require('../util/config');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
})

mongoose.connect(config.MONGODB_URI)

module.exports = mongoose.model('Blog', blogSchema)
