const express = require('express');
const router = express.Router();
//importing authController
const authController = require('../controllers/authController');

//authentication routes here
router.get('/login', authController().login)

router.post('/login', authController().postLogin)

router.get('/register', authController().register)

router.post("/register", authController().postRegister)

router.get("/logout", authController().logout)

module.exports = router;