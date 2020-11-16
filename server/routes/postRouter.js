const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

let currentPage = 1;
let postsInCurrentPage = 0;

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
    let obj;

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content,
      page: currentPage,
    };

    const newPost = new Post(obj);
    await newPost.save();
    res.json({ message: "Post Uploaded" });
    postsInCurrentPage++;
    if (postsInCurrentPage === 8) {
      currentPage++;
      postsInCurrentPage=0
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// Get all the posts in DB
router.post("/getPostList", async (req, res) => {
  try {
    const fetchPosts = await Post.find({page: req.body._page}, null, {
      sort: { createdAt: -1 }
    });
    console.log(fetchPosts.length)
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
