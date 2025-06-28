const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const zod = require('zod');
const { GenerateToken } = require('../config/token');
const { hashPassword, matchPassword } = require('../config/securePassword');


const signupBody = zod.object({
	username: zod.string(),
	firstaName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),
});

const registerUser = expressAsyncHandler(async (req, res) => {
	const { username, firstName, lastName, password } = req.body;

	if (!username || !firstName || !lastName || !password) {
		return res.status(400).json({
			msg: 'Please fill all the fields',
		});
	}

	const { success } = signupBody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: 'Email already taken/Incorrect inputs',
		});
	}

	const userExists = await User.findOne({
		username,
	});
	if (userExists)
		return res.status(411).json({
			message: 'Email already taken/Incorrect inputs',
		});
	const hashedPass = await hashPassword(password);
	const user = await User.create({
		username,
		firstName,
		lastName,
		password: hashedPass,
	});

	const userId = user._id;
	const token = GenerateToken(userId);

	res.json({
		message: 'User created successfully',
		token: token,
	});
});

const signInbody = zod.object({
	username: zod.string(),
	password: zod.string(),
});

// signin
const signIn = expressAsyncHandler(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			msg: 'Please fill all the fields',
		});
	}

	const { success } = signInbody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: 'Email already taken/Incorrect inputs',
		});
	}

	const user = await User.findOne({
		username,
	});

	if (!user)
		return res.status(403).json({ message: 'No user with this username' });

	const isMatchPass = await matchPassword(password, user.password);
	if (!isMatchPass) return res.status(403).json({ message: 'Wrong Password' });

	res.json({
		message: 'Login Successfull',
		token: GenerateToken(user._id),
	});
});

module.exports = { registerUser,signIn };
