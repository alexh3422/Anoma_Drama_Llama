const express = require("express");
const router = express.Router();
const { Posts, Users, Llama, Mood } = require("../models");

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
  Users.findByPk(req.session.userId, {
    include: [Posts,Mood]
  }).then((userData) => {
    if (!userData) {
      console.log(userData);
      res.render("error", { alert: "User not found" });
      return;
    }
    const hbsUser = userData.toJSON();
    const userPostsReverse = hbsUser.posts.reverse();
    const allMoodPosts = userPostsReverse.filter(post => post.type === 'mood-entry')
    res.render("mood", {
      user: hbsUser,
      userPosts: allMoodPosts,
    });
  });
});

router.get("/profile", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Users.findByPk(req.session.userId, {
      include: [Posts],
    }).then((userData) => {
      const hbsUser = userData.toJSON();
      const allUserPosts = hbsUser.posts.reverse();
      console.log(allUserPosts);
      res.render("profile", {
        user: hbsUser,
        userPosts: allUserPosts,
      });
    });
  }
});

// ==========Llama route====================
router.get("/llama", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Users.findByPk(req.session.userId, {
      include: [Llama],
    }).then((userData) => {
      const hbsUser = userData.toJSON();
      console.log(hbsUser);
      res.render("llama", { user: hbsUser });
    });
  }
});

module.exports = router;
