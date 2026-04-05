const express = require('express');
const mongoose = require('mongoose');

const app = express();

// 👇 YAHAN connection code hoga
const uri = "mongodb+srv://hasratsadiq:YOUR_PASSWORD@cluster0.rda2axs.mongodb.net/urlShortener";

mongoose.connect(uri)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));