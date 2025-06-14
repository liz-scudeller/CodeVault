const User = require("../models/userModel");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async ({name, email, password}) =>{
    try {
        
    const userExists = await User.findOne({email});
    if (userExists) {
        throw new Error("User already registered");        
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return {
        message: 'User registered successfuly',
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    }
}
catch(error){
    throw error;
}
};
const login = async({email, password}) => {
    try {
        const userExists = await User.findOne({email});
        if(!userExists){
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if(!passwordMatch){
            throw new Error('Invalid password');
        } 
        const token = JWT.sign({id: userExists._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        return({
            message:'Login successfull',
            token,
            id: userExists._id,
            email,
        });

    } catch (error) {
        throw error;
    }
};


