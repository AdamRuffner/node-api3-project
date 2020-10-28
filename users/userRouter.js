const express = require("express");
const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", validateUserId, (req, res) => {
  res.status(200).json(req.post)
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((data) => {
      if (data) {
        next();
      } else {
        res.status(400).json({ message: "missing required name field" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "something went wrong" });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  if (!req.body.name) {
    next();
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required post field" });
  } else {
    res.status(400).json({ message: "missing required post" })
  }
}

module.exports = router;
