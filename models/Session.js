const Sequelize = require("sequelize");

module.exports = sequelize.define("Session", {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
});