const { registerUser, signIn } = require('../controllers/userController')

const router = require('express').Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(signIn)
module.exports  = router