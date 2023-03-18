const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require('../middleware/auth')
const logoutAuth = require('../middleware/logoutAuth')

router.post('/create-user', userController.signup)

router.post('/login-user', userController.login)

router.get('/logout-user', logoutAuth)

router.delete('/delete-user', auth,userController.deleteUser)

module.exports = router