const Users = require("./users");
const Posts = require("./posts");
const Comments = require("./comments");
const Mood = require("./mood");
const Llama = require("./llama");
const Reaction = require("./reaction");

Users.hasMany(Posts);
Users.hasMany(Comments);
Users.hasMany(Mood);
Posts.hasMany(Mood);
Posts.hasMany(Comments);
Users.hasMany(Reaction);
Comments.hasMany(Reaction);

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

Mood.belongsTo(Posts, {
  onDelete: "CASCADE",
});

Reaction.belongsTo(Users, {
  onDelete: "CASCADE",
});

Reaction.belongsTo(Comments, {
  onDelete: "CASCADE",
});

Llama.belongsTo(Users, {
  onDelete: "CASCADE",
});

Users.hasOne(Llama, {
  onDelete: "CASCADE",
});

module.exports = { Users, Posts, Comments, Mood, Llama, Reaction };
