const expressAsyncHandler = require('express-async-handler');
const { DecodeToken } = require('../config/token');
const User = require('../models/userModel');

// auth middleware
const protect = expressAsyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer '))
		return res.status(403).json({ message: 'Invalid Token' });

	const token = authHeader.split(' ')[1];
	try {
		const decoded = DecodeToken(token);

		req.User = await User.findOne(decoded.id).select('-password');

		next();
	} catch (error) {
		return res.status(403).json({ message: 'No token' });
	}
});





module.exports = protect