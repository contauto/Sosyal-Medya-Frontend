import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from '../shared/withRouter'


const ProfileCard=props=>{
  const pathUsername=(useParams()).username
    let message="We cannot edit"
    if(pathUsername===props.loggedInUsername){
        message="We can edit"
    }
  return (
    <div>{message}</div>
  )
}

const mapStateToProps=(store)=>{
  return {
    loggedInUsername:store.username
  }
}

export default connect(mapStateToProps)(withRouter(ProfileCard))