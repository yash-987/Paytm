const { registerUser, signIn, updateUser, searchUser } = require('../controllers/userController')
const protect = require('../middlewares/middlewares')

const router = require('express').Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(signIn)
router.route('/').put(protect, updateUser)
router.route('/bulk').get(protect,searchUser)
module.exports  = router
