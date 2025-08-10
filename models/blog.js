const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { required: true, type: String },
  datePosted: { required: true, type: Date, default: Date.now },
  img: { required: true, type: String },
  articleA: { required: true, type: String },
  articleB: { required: true, type: String },
  articleC: { required: true, type: String },
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
