const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

const getUserProfile = async (req, res) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(400).json({
			errors: validation.array(),
		});
	}

	try {
		const { uid } = req.query;
		const user = await userModel
			.findOne({
				_id: uid,
			})
			.select('-password');
		if (!user) {
			return res.status(404).json({
				errors: "User doesn't exist",
			});
		}

		return res.status(200).json({
			success: true,
			...user._doc,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error fetching user profile',
		});
	}
};

const updateUserProfile = async (req, res) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(400).json({
			errors: validation.array(),
		});
	}

	try {
		const { name, profile_photo } = req.body;
		const { uid } = req.query;
		const userExists = await User.findOne({ _id: uid });

		if (!userExists) {
			return res.status(404).json({
				errors: "User doesn't exist",
			});
		}

		userExists.updateOne(
			{
				name,
				profile_photo,
			},
			{ new: false }
		);

		await userExists.save();

		return res.status(200).json({
			success: true,
			message: 'User profile updated successfully.',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error updating user profile',
		});
	}
};

const deleteUserProfile = async (req, res) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(400).json({
			errors: validation.array(),
		});
	}

	try {
		const { uid } = req.query;
		const userExists = await User.findOneAndDelete({ _id: uid });

		if (!userExists) {
			return res.status(404).json({
				errors: "User doesn't exist",
			});
		}

		return res.status(200).json({
			success: true,
			message: 'User profile deleted successfully.',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error deleting user profile',
		});
	}
};

module.exports = {
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
};
