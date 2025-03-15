const express = require('express')
const router = express.Router()
const { authJwt } = require('../middleware')

const controller = require('../controllers/auth')
const { verifySignUp } = require('../middleware')


// router.get('/', getUserByUid)
router.post('/signup',[verifySignUp.checkDuplicateEmail], controller.signup)
router.post('/signin', controller.signin)
router.post('/change-access', controller.changeAccess)

module.exports = router