const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

router.post("/delete", async (req, res) => {
  try {
    await Post.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Post.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "Post Edited" });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// Write a new post
router.post("/write", async (req, res) => {
  try {
    let currentPage;
    let obj;

    const mostCurrentPost = await Post.findOne({}, null, {sort: { createdAt: -1 }});
    const currentPagePosts = await Post.find({page: mostCurrentPost.page});
    
    if (currentPagePosts.length < 8) { currentPage = mostCurrentPost.page}
    else { currentPage = mostCurrentPost.page + 1}

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content,
      page: currentPage,
    };

    const newPost = new Post(obj);
    await newPost.save();
    res.json({ message: "Post Uploaded" });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// Get all the posts in DB & Infinite Scroll
router.post("/getPostList", async (req, res) => {
  try {
    const fetchPosts = await Post.find({page: req.body._page}, null, {
      sort: { createdAt: -1 }
    });
    res.json({ posts: fetchPosts, length: fetchPosts.length});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const detailedPost = await Post.find({ _id });
    res.json({ detailedPost });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
