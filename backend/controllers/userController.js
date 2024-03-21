import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

// @desc Auth user & get token
// @route POST/api/users/login
// @access Public
const authUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;

  const user=await User.findOne({email:email});
  if(user &&(await user.matchPassword(password))){
    const token=jwt.sign({userId:user._id},
      'ss',{
      expiresIn:'30d'
    })

    //set JWT as http - only cookie

    res.cookie('jwt',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV !=='development',
      sameSite:'strict',
      maxAge:30*24*60*60*1000
    })

    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
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

  const 
    res.send('register user')
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
    res.send('get user profile')
  });

// @desc update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile=asyncHandler(async(req,res)=>{
    res.send('update user profile')
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
    res.send('get users')
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
    res.send('update users')
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