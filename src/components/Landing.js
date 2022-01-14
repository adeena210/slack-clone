import React, { Component } from 'react';
import { Home, Button } from '../style.js';
import {auth} from '../firebase.js';
import { store } from '../index';

class Landing extends Component {
    
    render(){
        console.log(store.getState());
        return(
        
            <div>
            
            
                <h1>This is ma slack clone :DD</h1>
                <Button as="a" href='./login'>Sign in</Button>
                <br/>
                <Button as="a" href='./register'>Register</Button>
            
            </div>       
        );
    }



}
export default Landing;