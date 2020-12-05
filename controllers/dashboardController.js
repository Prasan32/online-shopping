//importing models
const Category = require('../models/Category')
const Brand = require("../models/Brand")
const db = require('../database/connection')
const sequelize = require('../database/connection')

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
        async addCategory(req, res) {
            try {

                const category_name = req.body.category_name;
                const brandName = req.body.brandName;
                console.log(brandName)
                let category = await Category.findAll({
                    where: {
                        category_name: category_name
                    }
                })

                if (category.length > 0) {
                    await Category.findAll()
                        .then((categories) => {
                            res.redirect('/dashboard')
                        })
                } else {

                    let transaction = await sequelize.transaction({
                        autocommit: false
                    });

                    let newCategory = await Category.create({
                        category_name: category_name,
                    })

                    var category_id = 1

                    for (var i = 0; i < brandName.length; i++) {
                        let brand = await Brand.create({
                            brand_name: brandName[i],
                            category_id: category_id
                        })
                    }
                    await transaction.commit();
                    await Category.findAll()
                        .then((categories) => {
                            res.redirect('/dashboard')
                        })

                }
            } catch (e) {
                await transaction.rollback()
            }

        },
    }
}
module.exports = dashboardController