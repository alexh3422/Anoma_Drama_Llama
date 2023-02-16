const express = require("express");
const router = express.Router();
const { Posts, Users, Llama, Mood } = require("../models");

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    res.redirect("/home");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "main2" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { layout: "main2" });
});

router.get("/home", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Posts.findAll({
      include: [
        {
          model: Users,
          include: {
            model: Llama,
          },
        },
      ],
    }).then((postData) => {
      const hbsPost = postData.map((Post) => Post.toJSON());
      const allPublicPosts = hbsPost.filter(
        (post) =>
          post.visibility === "public" || post.visibility === "anonymous"
      );
      allPublicPosts.map((post) => {
        if (post.visibility === "anonymous") {
            post.user["username"] = "Someone's";
        } else {
          if(post.user.username == req.session.userUsername){
            post.user["username"] = "Your";
          } else {
            post.user["username"] = `${post.user.username}'s`;
          }
        }
      });
      res.render("home", {
        allPosts: allPublicPosts.reverse(),
      });
    });
  }
});

router.get("/journal", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    Users.findByPk(req.session.userId, {
      include: [Posts],
    }).then((userData) => {
      if (!userData) {
        res.render("error", { alert: "User not found" });
        return;
      }
      const hbsUser = userData.toJSON();
      const userPostsReverse = hbsUser.posts.reverse();
      const allJournalPosts = userPostsReverse.filter(
        (post) => post.type === "journal"
      );
      res.render("journal", {
        user: hbsUser,
        userPosts: allJournalPosts,
      });
    });
  }
});

router.get("/mood", (req, res) => {
  Users.findByPk(req.session.userId, {
    include: [Posts, Mood],
  }).then((userData) => {
    if (!userData) {
      res.render("error", { alert: "User not found" });
      return;
    }
    const hbsUser = userData.toJSON();
    const userPostsReverse = hbsUser.posts.reverse();
    const allMoodPosts = userPostsReverse.filter(
      (post) => post.type === "mood-entry"
    );
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
      res.render("llama", { user: hbsUser });
    });
  }
});

router.get("/bookmarks", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    res.render("bookmarks");
  }
});

module.exports = router;
