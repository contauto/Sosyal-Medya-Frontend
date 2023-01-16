import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from "../components/ProfileImageWithDefault"

const ProfileCard=props=>{
  // eslint-disable-next-line no-unused-vars
  const {username:loggedInUsername}=useSelector((store)=>({username:store.username}))
  const {user}=props
  const {username,name,image}=user

  // eslint-disable-next-line no-unused-vars
  const pathUsername=(useParams()).username
    
  

  return (
<div className='card text-center'>

<div className='card-header'>

<ProfileImageWithDefault className='rounded-circle shadow' width={200} height={200} alt={username+' profile'} image={image} ></ProfileImageWithDefault>


</div>

<div className='card-body'>

<h3>

{name}@{username}

</h3>


</div>


</div>
  )



}


export default ProfileCard