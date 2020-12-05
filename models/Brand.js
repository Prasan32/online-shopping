const Sequelize = require("sequelize");

module.exports = sequelize.define("Brand", {
    brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    },
});