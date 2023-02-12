const {Model , DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class Llama extends Model {}

Llama.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        llama_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        llama_hat_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        happiness: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 10
            }
        },

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'llama',
    }
);

module.exports = Llama;
    

