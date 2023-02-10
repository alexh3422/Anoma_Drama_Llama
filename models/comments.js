const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "comments",
});

module.exports = Comments;
