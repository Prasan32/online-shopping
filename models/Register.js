const Sequelize = require('sequelize');

module.exports = sequelize.define("Register", {
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: Sequelize.INTEGER,
    },
    address: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.BOOLEAN,
        defaultValue: "1",
    },
    image: {
        type: Sequelize.STRING,
    },
})