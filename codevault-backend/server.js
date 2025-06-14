const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});