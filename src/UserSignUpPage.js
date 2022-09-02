import React, { Component } from 'react'
import axios from 'axios';

export default class UserSignUpPage extends Component {

    state={
        id:null,
        name:null,
        password:null,
        rePassword:null
    };

onChange=event=>{
    const {name,value}=event.target
this.setState({
    [name]:value
})
}

onClick=event=>{
    const body={
        id:this.state.id,
        name:this.state.name,
        password:this.state.password

    }
    event.preventDefault()
    axios.post("http://localhost:8080/api/1.0/users",body)
}



  render() {
    return (
        <form>
            <h1>Sign Up</h1>

            <div>
            <label>ID</label>
            <input name='id' onChange={this.onChange}/>
            </div>

            <div>
            <label>Name</label>
            <input name='name' onChange={this.onChange}/>
            </div>

            <div>
            <label>Password</label>
            <input name='password' onChange={this.onChange} type="password"/>
            </div>

            <div>
            <label>Re-Password</label>
            <input name='rePassword' onChange={this.onChange} type="password"/>
            </div>

            <button onClick={this.onClick}>Sign Up</button>

        </form>
    );
  }
}
