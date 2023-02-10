const express = require("express")
const {createWorkout, getWorkouts,getaSingleWorkout, deleteWorkout, updateworkout} = require("../controllers/workoutControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//establish the middleware
router.use(requireAuth)

//get all workouts
router.get("/", getWorkouts)

//get a single workout 
router.get("/:id", getaSingleWorkout)

//post a new workout
router.post("/", createWorkout)

//delete a workout
router.delete("/:id", deleteWorkout)

//update workout
router.patch("/:id", updateworkout)



module.exports = router

