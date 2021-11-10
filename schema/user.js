const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	emailId: String,
	password: String,
	role: String,
	friends: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
