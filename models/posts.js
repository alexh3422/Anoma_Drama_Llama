const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Llama = require("./llama");

class Posts extends Model {
  static async afterCreate(post, options) {
    const llama = await Llama.findOne({ where: { userId: post.userId } });
    if (llama) {
      llama.happiness += post.type === "mood-entry" ? 1 : 2;
      llama.happiness = Math.min(llama.happiness, 10);
      await llama.save();
    }
  }
}

Posts.init(
  {
    moodText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["journal", "mood-entry"]],
      },
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["private", "anonymous", "public"]],
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "posts",
    hooks: {
      afterCreate: Posts.afterCreate,
    },
  }
);

module.exports = Posts;
