const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const codeController = require('../controllers/codeController');

router.post('/create',authMiddleware ,codeController.createSnippet);

router.get('/my-snippets', authMiddleware, codeController.mySnippets);

module.exports = router;