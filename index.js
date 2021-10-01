const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./route/auth.js');
const post = require('./route/post.js');

const url =
	'mongodb+srv://srk:srk@cluster0.q5jvx.mongodb.net/connect?retryWrites=true&w=majority';

mongoose.connect(url);

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/auth', auth);
app.use('/post', post);

app.listen(PORT, () => console.log('Started'));
