const express = require("express");
const router = express.Router();
const Posts = require("./postDb");

router.get("/", (req, res, next) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      next({ code: 500, message: err.message });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then((post) => {
      res.status(200).json({ message: "it worked" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body )
  .then(post => {
    res.status(200).json({ message: 'Congrats in updating' })
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  });
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Posts.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      next({ code: 400, message: "invalid post id" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
}

module.exports = router;
