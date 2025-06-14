const authService = require("../services/authService");

const registerUser = async (req,res) => {
    try {
        const {name, email, password } = req.body;
        const result = await authService.register({name, email, password});
        res.status(201).json(result);
        
    } catch (error) {
        console.error('Register error: ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }

};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await authService.login({email, password});
        res.status(200).json(result);

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {
    loginUser,
    registerUser
}