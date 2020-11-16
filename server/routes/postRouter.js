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
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    let obj;

    obj = {
      writer: req.body.id,
      title: req.body.title,
      content: req.body.content
    };

    const newPost = new Post(obj);
    await newPost.save();
    res.json({ message: "Post Uploaded" });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getPostList", async (req, res) => {
  try {
    const _id = req.body._id;
    const posts = await Post.find({}, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: posts });
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
