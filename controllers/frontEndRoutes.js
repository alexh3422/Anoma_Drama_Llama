const express = require("express");
const router = express.Router();
const { Posts, Users } = require("../models");

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Posts.findAll({
      include: [Users],
    }).then((PostData) => {
      console.log(PostData);
      const hbsPost = PostData.map((Post) => Post.toJSON());
      console.log("==============================");
      console.log(hbsPost);
      res.render("home", {
        allPosts: hbsPost,
      });
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "main2" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { layout: "main2" });
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/journal", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Users.findByPk(req.session.userId, {
      include: [Posts],
    }).then((userData) => {
      const hbsUser = userData.toJSON();
      res.render("journal", { user: hbsUser });
    });
  }
});

router.get("/mood", (req, res) => {
  res.render("mood");
})

router.get("/profile", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Users.findByPk(req.session.userId, {
      include: [Posts],
    }).then((userData) => {
      const hbsUser = userData.toJSON();
      res.render("profile", { user: hbsUser });
    });
  }
});

// ==========Llama route====================
router.get("/llama", (req, res) => {
  res.render("llama");
});

module.exports = router;
