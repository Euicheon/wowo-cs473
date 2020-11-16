const mongoose = require("mongoose");

const { Schema } = mongoose

const postSchema = new Schema({
  writer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  imgPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Post", postSchema);
