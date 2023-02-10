const express = require("express")

//controllers
const {loginUser, signupUser} = require("../controllers/userControllers")

const router = express.Router()

//login route
router.post("/login", loginUser)

//signup route
router.post("/signup", signupUser)

module.exports = router

