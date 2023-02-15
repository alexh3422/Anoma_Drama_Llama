const router = require("express").Router();
const { Users, Posts, Comments, Mood } = require("../models");

router.get("/", (req, res) => {
  Posts.findAll({
    include: [Users, Mood],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
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
  Posts.create({
    moodText: req.body.moodText,
    title: req.body.title,
    text: req.body.text,
    type: req.body.type,
    visibility: req.body.visibility,
    userId: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req,res) => {
  Posts.update({
    text: req.body.text,
  },{
    where: {
      id: req.params.id
    }
  }).then((dbPostData) => {res.json(dbPostData)})
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete("/:id", (req, res) => {
  Posts.destroy({
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