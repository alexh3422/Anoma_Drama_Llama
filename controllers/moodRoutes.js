const router = require("express").Router();
const { Users, Mood, Comments, Posts } = require("../models");

router.get("/", (req, res) => {
  Mood.findAll({
    include: [Users, Posts]
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// All moods by current user
router.get("/user", (req, res) => {
  Users.findByPk(req.session.userId, {
    include: [Mood],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Mood.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
    include: [Users, Comments],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post("/", (req, res) => {
  Mood.create({
    mood: req.body.mood,
    userId: req.session.userId,
    postId: req.body.postId
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Mood.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
