const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { createUser } = require("../service/user.service");
const { blacklistTokenModel } = require("../models/blacklist.model");
const {updateUser} = require("../service/user.service");
const {history} = require("../service/user.service"); 


module.exports.registerUser = async(req,res,next) =>{
    const error = validationResult(req);

    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }
try{
    const {firstName,lastName, email, password,number} = req.body;
console.log("This is number",number);
const isUserAlreadyRegistered
 = await userModel.findOne({email:email});

if(isUserAlreadyRegistered){
    return res.status(400).json({error: "User is already registered"});
}

    const hashedPassword = await userModel.hashPassword(password);

    console.log(req.body);

    const user = await createUser({
        firstName: firstName,
        lastName: lastName,
        email:email,
        password:hashedPassword,
        number:number
    });
 const token = user.generateAuthToken();

    res.status(201).json({token,user});

}
    catch(error){
        return res.status(500).send(error.message);
    }

   

}

module.exports.loginUser = async(req,res,next)=>{
    const error = validationResult(req);

    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }

    const {email , password} = req.body;
    try{
    const user = await userModel.findOne({
        email:email
    }).select('+password');

 if(!user){
        return res.status(401).json({
            message:"Haha wrong credentials fool"
        })
    }

    const isMatch = user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({
            message:"Haha wrong credentials fool"
        })
    }

    const token = user.generateAuthToken();

    res.json({
        token:token,
        user:user
    })

}
    catch(error){
        return res.status(500).send(error.message);
    }

   
}

module.exports.getUserProfile = async (req,res)=>{
return res.json({
    user:req.user
})
}

module.exports.logoutUser = async (req,res)=>{
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   
   await  blacklistTokenModel.create({token});

   return res.status(200).json({
    message:"Logget Out! Successfully!!"
   })
}

module.exports.updateUser = async (req,res)=>{
    const error = validationResult(req);

    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }

    const {userId,firstName, lastName,  oldPassword ,newPassword} = req.body;
try{
    const user = await updateUser({
        userId:userId,
        firstName:firstName,
        lastName:lastName,
        oldPassword:oldPassword,
        newPassword:newPassword
    });
    return res.status(200).json({user});
}catch(error){
    return res.status(400).json({error:error.message});
}
  
}

module.exports.getHistory = async(req,res,next)=> {
    
    const userId = req.query.userId;
try{
    const response = await history(userId);

    res.send(response);}
    catch(error){
    return res.status(500).send(error.message);
    }
}