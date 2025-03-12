const express = require('express')
const router = express.Router()
//const { authJwt } = require('../middlewares')

const { getReviews } = require('../controllers/review')


router.get('/', getReviews)
//router.post('/', [authJwt.verifyToken], addCourse)

module.exports = router