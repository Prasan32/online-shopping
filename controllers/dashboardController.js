//importing models
const Category = require('../models/Category')

function dashboardController() {
    return {

        //rendering dashboard page
        dashboard(req, res) {
            res.render('dashboard/dashboard', {
                layout: 'dashboardLayout',
                title: "dashboard"
            })
        },

        //rendering categories from database
        category(req, res) {
            res.render('dashboard/addCategory', {
                layout: "dashboardLayout",
                title: 'Category'
            })
        },
        //adding category in database
        addCategory(req, res) {

        },
    }
}

module.exports = dashboardController