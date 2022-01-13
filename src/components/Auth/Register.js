import React, { Component } from 'react';
import { auth, db } from '../../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { Button, Input, Form } from '../../style.js';
import { connect } from 'react-redux';


/*
TO DO:
1. email verification 
2. fix styling
*/

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password_conf: "",
            valid: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPass = this.checkPass.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.props.login(user.uid);
        updateProfile(user, {displayName:this.state.username});
        console.log("Registered user: ", user);
        const add = addDoc(collection(db, "users"),{
            uid: user.uid,
            name: this.state.username,
            authProvider: "local",
            email: this.state.email,
      
          });
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ocured: ", errorCode, errorMessage);
        alert(errorMessage.concat(" Please try again!"));
      });
        event.preventDefault();
    }

    checkPass(event) {
    this.handleChange(event)
    if (event.target.value !== this.state.password){
        this.setState({valid : false});
    }
    else {
        this.setState({valid : true});
    }

    }


    render(){
        return(
        <div align='center'>
        <Form as="form" onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <div>
        <label>
            Username: 
        <Input as="input"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            />
        </label>
        <br/>
        <label>
            Email: 
        <Input as="input"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            />
        </label>
        <br/>
        <label>
            Password: 
        <Input as="input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            />
        </label>
        <br/>
        <label >
            Password Again:   
        <Input as="input"
            name="password_conf"
            type="password"
            value={this.state.password_conf}
            onChange={this.checkPass}
            />
        </label>
        </div>
        <br/>
        <Button as="button" disabled = {!this.state.valid} type="submit">Register</Button>
        {this.state.valid !== false ? null : <div> Passwords do not match!</div>}
        <span><br/>Already have an account?</span>
        <a href='/login' style={{marginLeft: '.5rem'}}>Sign in</a>
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


export default connect (mapStateToProps, mapDispatchToProps)(Register);
