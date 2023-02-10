const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Users extends Model {}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },

  {
    sequelize,
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },

    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
  }
);

module.exports = Users;
