const express = require('express');

const router = express.Router()

const isAuth = require('../../middleware/isAuth')

const RequestController = require('../controllers/request')

//localhost:3000/requests/make
router.post('/make/:postId', RequestController.makeRequest)

module.exports = router; 

