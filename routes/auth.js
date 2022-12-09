const express = require('express')
const router = express.Router()

const { login, getInsurers } = require('../controllers/auth')

router.post('/users', login)
router.get('/insurers', getInsurers)

module.exports = router