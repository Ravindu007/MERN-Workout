const jwt = require("jsonwebtoken")
//models
const userModel = require("../models/userModel")


const createToken  = (_id) =>{
  return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'})
}

//login user
const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await userModel.login(email,password)

    //create a token 
    const token = createToken(user._id)
    res.status(200).json({email, token})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
  
}


//signup user
const signupUser = async(req, res) => {

  const {email, password} = req.body

  try {
    const user = await userModel.signup(email,password)

    //create a token 
    const token = createToken(user._id)
    res.status(200).json({email, token})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
  
}

module.exports = {loginUser, signupUser}

