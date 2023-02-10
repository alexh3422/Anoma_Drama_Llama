const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

Users.hasMany(Posts);
Users.hasMany(Comments);
Posts.hasMany(Comments);

Posts.belongsTo(Users, {
  onDelete: "CASCADE",
});

Comments.belongsTo(Users, {
  onDelete: "CASCADE",
});

Comments.belongsTo(Posts, {
  onDelete: "CASCADE",
});

module.exports = { Users, Posts, Comments };
