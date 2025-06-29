const express = require("express");
const { getBalance, transferFunds } = require("../controllers/accountController");
const protect = require("../middlewares/middlewares.js");
const router = express.Router();

router.route("/balance").get(protect, getBalance);
router.route('/transfer').post(protect,transferFunds)
module.exports = router;
