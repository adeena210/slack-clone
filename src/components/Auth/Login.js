import React, { Component } from 'react';
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { Button, Input, Form } from '../../style.js';
import { connect } from 'react-redux';
/**
 TO DO:
 1. password reset option
 2. fix styling

 */

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.setState({loggedIn : true});
        console.log(user.uid);
        this.props.login(user.uid);
        console.log(this.props);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
        alert(errorMessage.concat(" Please try again!"));
      });
    }

    render(){
    return(
    <div>
  
    <Form as="form"onSubmit={this.handleSubmit}>
    <h1>Log-In</h1>
    <div>
    <label>
        Email:
    
    </label>
    <Input as="input" 
        name="email"
        type="text" 
        value={this.state.email}
        onChange={this.handleChange}  
        />
    <br/>
    <label>
        Password:
  
    </label>
    <Input as="input"
        name="password"
        type="password"
        value={this.state.password}
        onChange={this.handleChange}
        />
    <br />
    </div>
    <Button as="button" type="button" onClick={this.handleSubmit}>Log in</Button>
    <span><br/>Don't have an account?</span>
    <a href = '/register' style={{marginLeft: '.5rem'}}>Register here</a>
    {this.props.loggedIn ? (<Navigate to= "/dashboard"/>) : null}
    </Form>
   
    </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        loggedIn: state.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        login: (user) => {dispatch({type: 'LOGIN', payload: user})}
    })
}


export default connect (mapStateToProps, mapDispatchToProps)(Login);
