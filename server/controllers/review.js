const { review } = require('../models/review')

const getReviews = async (req, res) => {
    try {
        const reviews = await review.findAll()
        if (!reviews) return res.status(404).send({ message: 'courses not found'})
    } catch (error) {
        return 
    }
}

module.exports = { getReviews }