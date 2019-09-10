const express = require('express');

const router = express.Router()

const isAuth = require('../../middleware/isAuth')

const RequestController = require('../controllers/request')

//localhost:3000/requests/make  <--- send requesterID as param
router.post('/make/:postId', RequestController.makeRequest)

module.exports = router; 

