const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const {getToken} = require("../utils/helpers");

//post route will help to register a user
router.post("/register",async (req,res) =>{


     //regestraion will have{email,password,firstname,lastname,username}

     const{email , password , firstname , lastname , username} = req.body;
//if user already exits
     const existingUser = await User.findOne({email:email});
     if(existingUser){
        return  res
        .status(403)
        .json({error:"A user exits with this email"});

     }
//create new user
     const hashedPassword = bcrypt.hash(password, 10);//password will be hased using bcrypt
     const newUserData = {email,
          password: hashedPassword,
          firstname,
          lastname,
          username
     };
     const newUser = await User.create(newUserData);

     const token = await getToken(email,newUser);

     const userToReturn = {...newUser.toJSON(),token};
     delete userToReturn.password;
     return res.status(200).json(userToReturn);

});

router.post("/login",async(req,res)=>{

     const user = await User.findOne({email: email});
     if(!user){
          return res.status(403).json({err:"Invalid credentials"});
     }

     const isPasswordValid = await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
          return res.status(403).json({err:"Invalid credentials"});
     }

     const token =await getToken(user,email,user);
     const userToReturn = {...user.toJSON(),token};
     delete userToReturn.password;
     return res.status(200).json(userToReturn);


})
module.exports = router;