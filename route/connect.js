const express = require('express');
const User = require('../schema/user.js');
const router = express.Router();

router.post('/friend', async (req, res) => {
	try {
		const { emailId, friendName } = req.body;
		if (!emailId || !friendName) {
			return res
				.status(400)
				.json({ status: false, error: 'Invalid parameters' });
		}
		const user = await User.findOne({ emailId });
		if (!user) {
			return res
				.status(400)
				.json({ status: false, error: "User doesn't exists" });
		}
		User.findOneAndUpdate(
			{ emailId: emailId },
			{
				$push: {
					friends: {
						name: friendName,
					},
				},
			},
		);
		await user.save(done);
		res.json({ status: true });
	} catch (error) {
		res.status(500).json({ status: false, error: 'Internal server error' });
	}
});

router.post('/display', async (req, res) => {
	try {
		const { emailId } = req.body;
		if (!emailId) {
			return res
				.status(400)
				.json({ status: false, error: 'Invalid parameters' });
		}
		const user = await User.findOne({ emailId });
		if (!user) {
			return res
				.status(400)
				.json({ status: false, error: "User doesn't exists" });
		}
		if (user.friends.length === 0) {
			return res.json({ status: false, error: 'No Friends Found' });
		}
		return res.json({
			status: true,
			friends: user.friends,
		});
	} catch (error) {
		res.status(500).json({ status: false, error: 'Internal server error' });
	}
});

module.exports = router;
