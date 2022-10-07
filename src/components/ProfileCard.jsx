import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ProfileCard=props=>{
  const {username:loggedInUsername}=useSelector((store)=>({username:store.username}))
  const pathUsername=(useParams()).username
    let message="We cannot edit"
    if(pathUsername===loggedInUsername){
        message="We can edit"
    }
  return (
    <div>{message}</div>
  )
}


export default ProfileCard