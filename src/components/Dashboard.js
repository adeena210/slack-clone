import React, { Component } from 'react';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { Button, Form } from '../style';
import { connect } from 'react-redux';

 /*    TO DO: 
        1. add redux
        Skeletons for:
        2. Side Panel
        3. Metadata Panel
        4. Message panel
        5. User dropdown
            - sign out --> figured that out
            - avatar
            - user credentials
        6. Logo/App header        
*/



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : null,
            loading : true
        };
        
        this.authlistener = this.authlistener.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    
    componentDidMount(){
        this.unsubscribe = this.authlistener();
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    
    authlistener(){
        return auth.onAuthStateChanged((user) => {
        
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            this.setState({user:user, loading: false});
            console.log(this.state.user);
          } else {this.setState({user:user, loading: false});
          console.log(this.state.user);
            
            
            
          }
        });
      
    }

    handleLogOut(){
        signOut(auth).then(() => {
            // Sign-out successful.
            this.props.logout();
            
          }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error ocured: ", errorCode, errorMessage);
          });
        
        
   }

    
    
   



    render(){

        const loading = this.state.loading
        const user = this.state.user
        if (loading) return <div>Loading</div>
        if (user===null) return <Navigate to='../login'/>

        return(
        <div>
        
            <h1>Placeholder Dashboard :)))</h1>  
            <Button as="button" onClick={this.handleLogOut}> Sign Out</Button>
            <Form><h1>{user.email}</h1></Form>
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
        logout: () => {dispatch({type: 'LOGOUT'})}
    })
}


export default connect (mapStateToProps, mapDispatchToProps)(Dashboard);