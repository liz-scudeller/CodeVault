const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const codeRoutes = require('./routes/codeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/snippet', codeRoutes);

module.exports = app;