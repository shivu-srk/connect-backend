const express = require('express');
const User = require('../schema/user.js');
const Post = require('../schema/post.js');
const router = express.Router();

router.post('/details', async (req, res) => {
	try {
		const { emailId } = req.body;
		if (!emailId)
			return res
				.status(400)
				.json({ status: false, error: 'Invalid parameters' });
		const user = await User.findOne({ emailId });
		if (!user)
			return res
				.status(400)
				.json({ status: false, error: "User doesn't exists" });
		const posts = await Post.find();
		res.json({
			status: true,
			name: user.name,
			postDetails: posts,
		});
	} catch (e) {
		res.status(500).json({ status: false, error: 'Internal server error' });
	}
});

module.exports = router;
