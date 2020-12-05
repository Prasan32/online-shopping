const Sequelize = require("sequelize");

module.exports = sequelize.define("Subcategory", {
    subcategory_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    subcategory_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    },
});