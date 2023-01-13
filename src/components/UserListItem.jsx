import React from 'react'
import { Link } from 'react-router-dom'
import defaultPicture from "../assets/profile.png"

export default function UserListItem(props) {
    
    const {user}=props
    const{username,name,image}=user
    let imageSource=defaultPicture
    if(image){
        imageSource=image
    }
  return (
    <Link to={"/user/"+username} className='list-group-item list-group-item-action'>
        <img src={imageSource} className='rounded-circle ms-1 mt-1' width={32} height={32}  alt={user.username+"'s profile picture"}></img>
                  <span className='ps-1'>{name}@{username}</span>  
            </Link>
  )
}
