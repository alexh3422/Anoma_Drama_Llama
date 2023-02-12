const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Mood extends Model {}

Mood.init(
  {
    mood: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "mood",
  }
);

module.exports = Mood;
