import React, { useState } from 'react'
import {useWorkoutContext} from "../hooks/useWorkoutContext"
import {useAuthContext} from "../hooks/useAuthContext"

import "./WorkoutForm.scss"

const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoads] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async(e) => {
      e.preventDefault()

      if(!user){
        setError('You must loggedin first')
        return
      }

      const workout = {title, load, reps}  
      
      const response = await fetch("/api/workouts/",{
        method: "POST",
        body:JSON.stringify(workout),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(!response.ok){
        setError(json.error)
      }
      if(response.ok){
        setTitle('')
        setLoads('')
        setReps('')
        setError(null)
        console.log('new workout created', json);
        dispatch({type:"CREATE_WORKOUT", payload:json})
      }
  }



  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise title: </label>
      <input 
        type="text"
        onChange={(e)=>{setTitle(e.target.value)}}
        value = {title}  
      />

      <label>Load (in Kg): </label>
      <input 
        type="number"
        onChange={(e)=>{setLoads(e.target.value)}}
        value = {load}  
      />

      <label>Reps: </label>
      <input 
        type="number"
        onChange={(e)=>{setReps(e.target.value)}}
        value = {reps}  
      />

      {error && <div className='error'>{error}</div>}

      <button>Add workout</button>
    </form>
  )
}

export default WorkoutForm