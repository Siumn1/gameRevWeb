const express = require('express')
const router = express.Router()
//const { authJwt } = require('../middlewares')

const { getUserByUid, createUser, getAllUsers  } = require('../controllers/user')

///api/user

router.get('/', getAllUsers)
router.get('/:userUid', getUserByUid)


module.exports = router