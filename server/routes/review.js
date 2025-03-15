const express = require('express')
const router = express.Router()
//const { authJwt } = require('../middlewares')
const reviewController = require('../controllers/review')


router.get('/', reviewController.getReviews)
router.post('/', reviewController.createReview)
//router.post('/', [authJwt.verifyToken], addCourse)

module.exports = router