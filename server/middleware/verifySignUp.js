const { auth } = require('../models/auth')

checkDuplicateEmail = async (req, res, next) => {
    console.log("req:", req);
    try {
        const authed = await auth.findOne({ where: { email: req.body.email.toLowerCase() } })
        if (authed) return res.status(405).send({ message: 'Email is already in use!' })
        next()
    } catch (error) {
        return res.status(500).send({ message: 'Cannot find email attribute' })
    }

}

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp