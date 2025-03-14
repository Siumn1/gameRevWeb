const { auth } = require('../models/auth')
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET
const { v4: uuidv4 } = require('uuid')

const ACCESS_LIFETIME = 15 * 60
const REFRESH_LIFETIME = 60 * 60 * 24 * 60

createToken = (uid, lifetime) => jwt.sign({ uid }, secret, { expiresIn: lifetime })
createAccess = (uid) => createToken(uid, ACCESS_LIFETIME)
createRefresh = (uid) => createToken(uid, REFRESH_LIFETIME)

exports.signup = async (req, res) => {
    try {
        const authed = await auth.create({
            uid: uuidv4(),
            email: req.body.email.toLowerCase(),
            role: 'user',
            password: bcrypt.hashSync(req.body.password, 8)
        })
        const cur_user = await User.create({
            uid: authed.uid,
            name: req.body.name,
            interests: req.body.interests
        })
        return res.status(201).send({ message: 'registered!', uid: cur_user.uid })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
exports.signin = async (req, res) => {
    try {
        const user = await auth.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(414).send({ message: 'Invalid Password!' })
        const token = createAccess(user.uid)
        const token_refresh = createRefresh(user.uid)
        await auth.update({ AccessToken: token, RefreshToken: token_refresh }, { where: { uid: user.uid } })
        return res.status(200).send({
            uid: user.uid,
            accessToken: token,
            refreshToken: token_refresh,

        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.changeAccess = async (req, res) => {
    try {
        let token_refresh = req.headers['x-refresh-token']
        console.log(req);
        const { uid } = jwt.verify(token_refresh, secret)
        const user = await auth.findOne({ where: { uid: uid } })
        if (!user) return res.status(404).send({ message: 'User not found' })
        const token = createAccess(user.uid)
        token_refresh = createRefresh(user.uid)
        await auth.update({ AccessToken: token, RefreshToken: token_refresh }, { where: { uid: user.uid } })
        return res.status(200).send({
            uid: user.uid,
            accessToken: token,
            refreshToken: token_refresh
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}