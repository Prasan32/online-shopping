const express = require('express');
const router = express.Router();
//importing webController
const webController = require('../controllers/webController')

//web routes here
router.get('/', webController().index)

module.exports = router;