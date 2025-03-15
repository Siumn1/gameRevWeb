const { UUIDV4 } = require('sequelize')
const { User } = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const getUserByUid = async (req, res) => {
    try {
        const cur_user = await User.findOne({ where: { uid: req.query.uid } })
        if (!cur_user) return res.status(404).send({ message: 'User not found' })
        return res.json(cur_user)
    } catch (error) {
        console.log({message:error.message})
        return res.status(500).send({ message: error.message })
    }
}
const createUser = async (req, res) => {
    try {
        const { name, interests} = req.body;
        const user = await User.create({ uid: uuidv4(), name, interests})
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: 'Error creating user', error:error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const cur_users = await User.findAll()
        if (!cur_users) return res.status(404).send({ message: 'Users not found' })
        return res.json(cur_users)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    getUserByUid,
    createUser,
    getAllUsers,
}