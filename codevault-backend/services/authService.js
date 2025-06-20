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
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    };
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

const getMe = async( id ) => {
    try {
        if (!id) {
            throw new Error("ID is required");
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return{
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

    } catch (error) {
        throw error;
    }
};

const editUser = async({ id, name, email }) => {
    try {
        if (!id) {
            throw new Error("ID is required");
        }
        const user = await User.findById(id);
        if(!user){
            throw new Error("User not found");
        }

        user.name = name || user.name;
        user.email = email || user.email;


        const updatedUser = await user.save();

        return{
            id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            updatedAt: updatedUser.updatedAt
        };

    } catch (error) {
        throw error;
    }
};

const changePassword = async ({id, currentPassword, newPassword }) => {
    try {
        if(!id){
            throw new Error("ID is required");
        }
        const user = await User.findById(id);
        if(!user){
            throw new Error("User not found");        
        }
        const passwordMatch = await bcrypt.compare(currentPassword , user.password);

        if(!passwordMatch){
            throw new Error("Current password is incorrect");
        }
        const hashedPassword = await bcrypt.hash( newPassword, 10 );
        user.password = hashedPassword;

        await user.save();

        return{
            message:'Password updated successfully'
        };

    } catch (error) {
        throw error;
        
    }
};

const updateAvatar = async ({ id, avatarUrl }) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        user.avatarUrl = avatarUrl;
        await user.save();

        return{
            message: ' Avatar updated successfully ',
            avatarUrl
        };
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        if(!id){
            throw new Error('ID is required');
        }
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        await User.findByIdAndDelete(id);

        return{
            message: 'User deleted successfully'
        };

    } catch (error) {
        throw error;
    }
};
module.exports = {
    register,
    login,
    getMe,
    editUser,
    changePassword,
    updateAvatar,
    deleteUser
};
