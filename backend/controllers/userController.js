import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import genereateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


// @desc Auth user & get token
// @route POST/api/users
// @access Public
const authUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;

  const user=await User.findOne({email:email});
  if(user &&(await user.matchPassword(password))){
    let userId=user._id
    const token = jwt.sign({userId}, 'ss', {
      expiresIn: '30d'
    });
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      jwt:token
    })
  }else{
    res.status(401);
    throw new Error('invalid Email or password')
  }
});

// @desc register user
// @route POST/api/users
// @access Public
const registerUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body;

  const userExicts=await User.findOne({email});

  if(userExicts){
    res.status(400)
    throw new Error('user allready exicts');
  }

  const user=await User.create({
    name,
    email,
    password
  })

  if(user){

    const token=jwt.sign({user:user._id},
      'ss',{
      expiresIn:'30d'
    })
console.log(token)
    //set JWT as http - only cookie


   res.cookie('jwt',token,{
      httpOnly: false,
      credentials: 'include',
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    })
  }else{
    res.status(400);
    throw new Error('invalid user data')
  }

  });

// @desc logaut user
// @route POST/api/users/logaut
// @access private
const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie("jwt",'',{
      httpOnly:true,
      expiresIn:new Date(0),
    });
    res.status(200).json({message:'logged out'})
  });


// @desc get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);

  if(user){
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    })
  }else{
    res.status(404);
    throw new Error('User not found');
  }
  });

// @desc update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);

  if(user){

    user.name=req.body.name||user.name;
    user.email=req.body.email||user.email;

    if(req.body.password){
      user.password=req.body.password
    }

    const updatedUser=await user.save();
    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin
    })
  }else{
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get users
// @route Get /api/users
// @access private/admin
const getUsers=asyncHandler(async(req,res)=>{
    res.send('get users')
  });

  // @desc get users
// @route Get /api/users
// @access private/admin
const getUserById=asyncHandler(async(req,res)=>{

});

  // @desc delete user profile
// @route delete /api/users
// @access private/admin
const deleteUser=asyncHandler(async(req,res)=>{
    res.send('delete users')
  });

// @desc update user 
// @route put /api/users/:id
// @access private/admin
const updateUserById=asyncHandler(async(req,res)=>{
 
  });

  export {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUserById
  }