const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidation , loginValidation, updateUserValidation } = require('../validators/authValidator');
const handleValidation = require('../middlewares/handleValidation');

router.post('/register', registerValidation, handleValidation, authController.registerUser);
router.post('/login', loginValidation, handleValidation, authController.loginUser);

router.get('/me', authMiddleware, authController.getMe);
router.put('/me', authMiddleware, updateUserValidation, handleValidation, authController.editUser);



module.exports = router;