const Users = require("./Users");
const Posts = require("./Posts");

Posts.belongsTo(Users, {
  onDelete: "CASCADE",
});

Users.hasMany(Posts);

module.exports = { Users, Posts};
