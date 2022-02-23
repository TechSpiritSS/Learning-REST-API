const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Gets all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// Submits a new post
router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Gets a single post
router.get("/:postID", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Delete a post
router.delete("/:postID", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postID });
    res.json(removePost);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Update a post
router.patch("/:postID", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
