const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      // console.log(user)
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.insert({ ...req.body, user_id: req.params.id })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      // console.log(users)
      res.status(200).json(users);
    })
    .catch((err) => {
      next({ code: 500, message: err.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ code: 400, message: "invalid user id" });
    }
  } catch (error) {
    next({ code: 500, message: error.message });
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    next({ code: 400, message: "missing user data" });
  } else if (!req.body.name || typeof req.body.name !== "string") {
    next({ code: 400, message: "missing name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    next({ code: 400, message: "missnig post data" });
  } else if (!req.body.text) {
    next({ code: 400, message: "missing required text field" });
  } else {
    next();
  }
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
