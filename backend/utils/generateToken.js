import jwt from "jsonwebtoken";

const genereateToken=(res,userId)=>{
    const token=jwt.sign({userId},
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
  
}

export default genereateToken;