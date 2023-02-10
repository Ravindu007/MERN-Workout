const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async(req, res, next) => {
  //verify authentication 
  const {authorization} = req.headers

  if(!authorization){
    return res.status(401).json({error:'Authorization token required'})
  }
  //grabbing the token
  const token = authorization.split(" ")[1]
  const userEmail = authorization.split(" ")[0]

  try {
    //grabbing the id from the token
    const {_id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    req.email = userEmail
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({error:'Request is not authorized'})
  }
}

module.exports = requireAuth

