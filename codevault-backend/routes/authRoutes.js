const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');


const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidation , loginValidation, updateUserValidation, changePasswordValidation } = require('../validators/authValidator');
const handleValidation = require('../middlewares/handleValidation');

router.post('/register', registerValidation, handleValidation, authController.registerUser);
router.post('/login', loginValidation, handleValidation, authController.loginUser);

router.get('/me', authMiddleware, authController.getMe);

router.put('/me', authMiddleware, updateUserValidation, handleValidation, authController.editUser);
router.put('/change-password', authMiddleware, changePasswordValidation, handleValidation, authController.changePassword);
router.put('/avatar', authMiddleware, upload.single('avatar'), authController.uploadAvatar);

router.delete('/delete', authMiddleware, authController.deleteUser);

module.exports = router;