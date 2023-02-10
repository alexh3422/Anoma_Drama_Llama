const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const postsRoutes = require("./postsRoutes");
const commentsRoutes = require("./commentsRoutes");
const MoodRoutes = require("./moodRoutes");
const frontEndRoutes = require("./frontEndRoutes");

router.use("/api/users", userRoutes);
router.use("/api/posts", postsRoutes);
router.use("/api/comments", commentsRoutes);
router.use("/api/moods", MoodRoutes);
router.use("/", frontEndRoutes);

module.exports = router;
