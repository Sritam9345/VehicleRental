const userModel = require("../models/user.model")

module.exports.createUser = async ({firstName,lastName,email,password})=>{
    if(!firstName || !password || !email){
        throw new Error('All fields are required');
    }

    try {
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password
        })
        return user;
    } catch (error) {
        throw new Error('Error creating user in the database: ' + error.message);
    }
}

module.exports.updateUser = async ({userId, firstName , lastName , oldPassword , newPassword})=>{

    try {
        const user = await userModel
        .findById(userId)
        .select('+password');

        if(!user){
           throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(oldPassword);

        if(!isMatch){
           throw new Error('Old password is incorrect');
        }
let newHashedPassword = undefined;

        if(newPassword){
        newHashedPassword = await userModel.hashPassword(newPassword);
        }

        const updatedUser = await userModel.findByIdAndUpdate
        (userId,{
            firstName: firstName,
            lastName: lastName,
            password: newHashedPassword || user.password,
        },{new:true});

        return updatedUser;
    }
    catch(error){
        throw new Error('Error updating user in the database: ' + error.message);
    }

    
}

