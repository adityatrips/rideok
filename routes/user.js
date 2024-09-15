const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/userModel');
const router = Router();
const {
	updateUserProfile,
	deleteUserProfile,
	getUserProfile,
} = require('../controllers/userController');

router.get(
	'/',
	[check('uid').isAlphanumeric().withMessage('Invalid user id')],
	getUserProfile
);

router.patch(
	'/',
	[check('uid').isAlphanumeric().withMessage('Invalid user id')],
	updateUserProfile
);

router.delete(
	'/',
	[check('uid').isAlphanumeric().withMessage('Invalid user id')],
	deleteUserProfile
);

module.exports = router;
