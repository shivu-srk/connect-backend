const express = require('express');
const User = require('../schema/user.js');
const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const { name, emailId, password,role } = req.body;
		if (!(name && emailId && password && role))
			return res
				.status(400)
				.json({ status: false, error: 'Invalid parameters' });

		const exists = await User.exists({ emailId });

		if (exists) {
			return res
				.status(400)
				.json({ status: false, error: 'User already exists' });
		}
		const user = new User({
			name,
			emailId,
			password,
			role,
		});
		await user.save();

		res.json({ status: true });
	} catch (e) {
		res.status(500).json({ status: false, error: 'Internal server error' });
	}
});

router.post('/signin', async (req, res) => {
	try {
		const { emailId, password } = req.body;
		if (!(emailId && password))
			return res
				.status(400)
				.json({ status: false, error: 'Invalid parameters' });

		const exists = await User.exists({ emailId, password });

		if (!exists) {
			return res
				.status(400)
				.json({ status: false, error: "User doesn't exists" });
		}

		res.json({ status: true });
	} catch (e) {
		res.status(500).json({ status: false, error: 'Internal server error' });
	}
});

module.exports = router;
