
const mongoose = require("mongoose")

const workoutModel = require("../models/workoutModel")


//get all workouts
const getWorkouts = async (req, res) =>{
  try {
    //const user_id = req.user._id
    const allworkouts = await workoutModel.find({}).sort({createdAt:-1})
    res.status(200).json(allworkouts)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//get a single workout
const getaSingleWorkout = async(req, res)=>{
  try {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such doc"})
    }

    const singleWorkout = await workoutModel.findById(id)

    if(!singleWorkout){
      return res.status(404).json({error:"No such doc"})
    }
    res.status(200).json(singleWorkout)

  } catch (error) {
    res.status(400).json({error:error.message})
  }
}


//create a workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body
  const email = req.email
  try {
    const user_id = req.user._id
    const workout = await workoutModel.create({title, reps, load, user_id, email})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}


//delete a workout
const deleteWorkout = async(req, res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such doc"})
  }
  const deletedworkout = await workoutModel.findByIdAndDelete({_id:id})

  if(!deletedworkout){
    return res.status(404).json({error:"No such doc"})
  }
  res.status(200).json(deletedworkout)
}



//update a workout 
const updateworkout = async (req, res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such doc"})
  }

  const updatedWorkout = await workoutModel.findByIdAndUpdate({_id:id},{...req.body}, {new:true})

  if(!updatedWorkout){
    return res.status(404).json({error:"No such doc"})
  }
  res.status(200).json(updatedWorkout)
}


module.exports = {createWorkout, getWorkouts, getaSingleWorkout, deleteWorkout, updateworkout }






