const router = require("express").Router();
const { Users, Mood, Comments, Reaction, Llama } = require("../models");

router.get("/", (req, res) => {
  Llama.findAll({
    include: [Users],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occured", err });
    });
});

// Get llama by user ID
router.get("/user/:id", (req, res) => {
  Users.findByPk(req.params.id, {
    include: [Llama],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occured", err });
    });
});

router.post("/", (req, res) => {
  Llama.create({
    name: req.body.name,
    llama_image: req.body.llama_image,
    llama_hat_image: req.body.llama_hat_image,
    happiness: req.body.happiness,
    userId: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Llama.update(
    {
      name: req.body.name,
      llama_image: req.body.llama_image,
      llama_hat_image: req.body.llama_hat_image,
      happiness: req.body.happiness,
      userId: req.session.userId,
    },
    { where: { id: req.params.id } }
  )
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Llama.destroy({
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
