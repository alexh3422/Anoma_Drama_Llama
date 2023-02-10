const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");
const Mood = require("./Mood");

Users.hasMany(Posts);
Users.hasMany(Comments);
Users.hasMany(Mood);
Posts.hasMany(Comments);
Mood.hasMany(Comments);

Posts.belongsTo(Users, {
  onDelete: "CASCADE",
});

Comments.belongsTo(Users, {
  onDelete: "CASCADE",
});

Comments.belongsTo(Posts, {
  onDelete: "CASCADE",
});

Comments.belongsTo(Mood, {
  onDelete: "CASCADE",
});

Mood.belongsTo(Users, {
  onDelete: "CASCADE",
});

module.exports = { Users, Posts, Comments, Mood };
