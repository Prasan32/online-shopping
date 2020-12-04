const Sequelize = require('sequelize');

module.exports = sequelize.define("Category", {
    category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    position: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    },
});