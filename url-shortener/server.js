const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Model
const Url = require('./models/Url');

// API: Shorten URL
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:3000/${shortCode}`;

  const newUrl = new Url({
    longUrl,
    shortCode,
    shortUrl
  });

  await newUrl.save();

  res.json({ shortUrl });
});

// Redirect route
app.get('/:code', async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });

  if (url) {
    return res.redirect(url.longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});