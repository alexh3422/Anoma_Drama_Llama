const router = require("express").Router();
const { Users, Posts, Comments, Mood } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const email = require("../nodemailer");

router.get("/", (req, res) => {
  Users.findAll({
    include: [Posts, Comments, Mood],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.post("/", (req, res) => {
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.userId = dbUserData.id;
      req.session.userUsername = dbUserData.username;
      req.session.userEmail = dbUserData.email;

      email(req.body.email, req.body.username);
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/currentUser", (req, res) => {
  Users.findOne({
    where: {
      id: req.session.userId,
    },
    attributes: { exclude: ["password"] },
    include: [Posts, Comments],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
    include: [Posts, Comments],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      [Op.or]: [{ username: req.body.login }, [{ email: req.body.login }]],
    },
  })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({ msg: "incorrect email or password" });
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.userId = userData.id;
          req.session.userUsername = userData.username;
          req.session.userEmail = userData.email;
          return res.json(userData);
        } else {
          return res.status(401).json({ msg: "incorrect email or password" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Try Again!", err });
    });
});

router.put("/", (req, res) => {
  Users.update(
    {
      currentMood: req.body.currentMood,
    },
    {
      where: { id: req.session.userId },
    }
  )
    .then((data) => {
      if (data[0]) {
        req.session.userUserMood = req.body.currentMood;
        return res.json(data);
      } else {
        return res.status(404).json({ msg: "no such record" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "an error occurred",
        err: err,
      });
    });
});

module.exports = router;
