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
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home", (req, res) => {
  res.render("home");
})

router.get("/profile", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    res.render("profile");
  }
});

module.exports = router;