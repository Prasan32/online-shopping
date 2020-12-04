const express = require('express');
const router = express.Router();

//importing dashboard controller
const dashboardController = require('../controllers/dashboardController')

//importing middleware that check whether admin is logged in or not
const isAdmin = require('../controllers/middlewares/admin')
//dashboard routes here

router.get('/dashboard', isAdmin, dashboardController().dashboard)

module.exports = router;