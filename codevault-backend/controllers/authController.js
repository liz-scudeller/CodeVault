const authService = require("../services/authService");
const authMiddleware = require('../middlewares/authMiddleware');

const registerUser = async (req,res) => {
    try {
        const {name, email, password } = req.body;
        const result = await authService.register({name, email, password});
        res.status(201).json(result);
        
    } catch (error) {
        console.error('Register error: ', error);
        res.status(500).json({message: error.message});
    }

};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await authService.login({ email, password });
        res.status(200).json(result);

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: error.message });
    }
};

const getMe = async ( req, res ) => {
    try {
        const userData = await authService.getMe(req.user.id);
        res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editUser = async ( req, res ) => {
    try {
        const id = req.user.id;
        const { name, email } = req.body;

        const updatedUser = await authService.editUser({ id, name, email });
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(400).json({ messa:error.message });
    }
}; 

module.exports = {
    loginUser,
    registerUser,
    getMe,
    editUser
}