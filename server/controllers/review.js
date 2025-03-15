const { Review } = require('../models/review')
const { User } = require('../models/user')

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({include: [{model: User, as :'user'}]})
        if (!reviews) return res.status(404).send({ message: 'courses not found'})
        return res.status(201).send(reviews)
    } catch (error) {
        return res.status(500).send({ message: 'courses not found'})
    }
}
// Обновить обзор
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Обзор не найден' });
        }
        review.title = title;
        review.content = content;
        await review.save();
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при обновлении обзора', error: err });
    }
};

// Удалить обзор
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Обзор не найден' });
        }
        await review.destroy();
        res.status(204).json({ message: 'Обзор удален' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении обзора', error: err });
    }
};
//Add review
const createReview = async (req, res) => {
    try {
        const {  title, content, rating, userId } = req.body;
        
        const user = await User.findOne({ where: { uid: userId } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const review = Review.create({
            title,
            content,
            rating,
            userId,
        });
        return res.status(201).json(review);
    } catch (error){
        return res.status(500).json({message: 'Error creating review', error: error.message})

    }
}
module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
};

