const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { check } = require('express-validator');

const router = Router();

router.post(
	'/register',
	[
		check('name').isString().withMessage('Name must be alphanumeric'),
		check('email').isEmail().withMessage('Email must be valid'),
		check('password')
			.isLength({ min: 6, max: 20 })
			.withMessage('Password must be at least 6-20 characters long'),
		check('username')
			.isAlphanumeric()
			.isLength({ min: 3, max: 20 })
			.withMessage(
				'Username must be alphanumeric and between 3-20 characters long'
			),
		check('phone')
			.isMobilePhone(['en-IN'])
			.withMessage('Phone number must be valid'),
	],
	registerUser
);
router.post(
	'/login',
	[check('email').isEmail().withMessage('Email must be valid')],
	loginUser
);

module.exports = router;
