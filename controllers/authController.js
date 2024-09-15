const { validationResult } = require('express-validator');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: validation.array(),
		});
	}

	const { name, email, password, phone, username } = req.body;

	try {
		const userExists = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (userExists) {
			return res.status(400).json({
				error: 'User already exists',
			});
		}

		const newUser = new User({
			name,
			email,
			password,
			phone,
			username,
		});
		await newUser.save();
		return res.json({ ...newUser._doc });
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(400).json({
			errors: validation.array(),
		});
	}

	const { email, password } = req.body;

	const user = await User.findOne({
		email,
	});
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'User does not exist. Consider signing up 😉',
		});
	}

	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		return res.status(400).json({
			ok: false,
			error: 'Invalid password',
		});
	}

	return res.json({
		ok: true,
		...user._doc,
	});
};

module.exports = {
	loginUser,
	registerUser,
};
