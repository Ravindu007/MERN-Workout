import React, { useState } from 'react'
import {useWorkoutContext} from "../hooks/useWorkoutContext"
import {useAuthContext} from "../hooks/useAuthContext"

import "./WorkoutDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({workout}, props) => {

  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftReps, setDraftReps] = useState("")
  const [draftload, setDraftLoad] = useState("")


  const handleDelete = async(e) =>{
    e.preventDefault()

    if(!user){
      return
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      //disptach DELETE action
      dispatch({type:"DELETE_WORKOUT", payload:json})
    }
    
  }

  const handleUpdate = async(e) =>{

    e.preventDefault()
    setIsEditing(false)

    if(!user){
      return
    }

    const title = e.target.elements.title.value;
    const load = e.target.elements.load.value;
    const reps = e.target.elements.reps.value;
    
    const editedWorkout = {title, reps, load}

    const response = await fetch("/api/workouts/" +  workout._id,{
      method: "PATCH",
      body:JSON.stringify(editedWorkout),
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()


    if(!response.ok){
      console.log("Error");
    }
    if(response.ok){
      setDraftTitle('')
      setDraftLoad('')
      setDraftReps('')
      console.log('workout updated', json);
      dispatch({type:"UPDATE_WORKOUT", payload:json})
    }
  }

  return (
    <div className="workout-details">
      {!isEditing && (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Reps:</strong>{workout.reps}</p>
          <p><strong>Load(Kg):</strong>{workout.load}</p>
          <p><strong>Created At:</strong>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix:true})}</p>
          <p><strong>Updated at:</strong>{formatDistanceToNow(new Date(workout.updatedAt), {addSuffix:true})}</p>
          <p><strong>created by:</strong>{workout.email}</p>
          {(user.email === workout.email) && (
            <>
              <span 
                style={{
                  color:"red",
                  marginRight:"50px"
                }}
                onClick={handleDelete}
              >
                Delete
              </span>
              <span
                onClick={()=>{
                  setIsEditing(true)
                  setDraftTitle(workout.title)
                  setDraftReps(workout.reps)
                  setDraftLoad(workout.load)
                }}
              >
                Edit
              </span>
            </>
          )}
        </>
      )}
      {
        isEditing && (
          <form onSubmit={handleUpdate}>
            <input type="text" 
                    name="title"  
                    onChange={e => setDraftTitle(e.target.value)} 
                    value={draftTitle} 
                    placeholder="Title" />
            <input type="number"
                    name="load"  
                    onChange={e => setDraftLoad(e.target.value)} 
                    value={draftload} 
                    placeholder="Load"/>
            <input type="number"
                    name="reps"  
                    onChange={e => setDraftReps(e.target.value)} 
                    value={draftReps} 
                    placeholder="Reps" />
            <button
              type='submit'
              style={{
                marginRight:"10px"
              }}
            >
              Save
            </button>
            <button
              onClick={()=>setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )
      }
    </div>
  )
}

export default WorkoutDetails