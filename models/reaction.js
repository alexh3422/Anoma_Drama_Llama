const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reaction extends Model {}

Reaction.init(
  {
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "reaction",
  }
);

module.exports = Reaction;
