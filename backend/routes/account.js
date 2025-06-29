const express = require("express")
const { getBalance } = require("../controllers/accountController")
const protect = require("../middlewares/middlewares.js")
const router = express.Router()

router.route('/balance').get(protect,getBalance)


module.exports= router
