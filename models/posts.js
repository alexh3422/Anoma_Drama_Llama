const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

Posts.init(
  {
    moodText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['journal', 'mood-entry']]
      }
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['private', 'anonymous', 'public']]
      }
    }
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "posts",
  }
);

module.exports = Posts;
