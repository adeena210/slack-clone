import React, { Component } from 'react';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { Button, Form } from '../style';
import { connect } from 'react-redux';
import { Grid , GridItem, Box, Input, HStack, Avatar  } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { storage } from '../firebase.js';
import { getDownloadURL, ref } from 'firebase/storage';


 /*    TO DO: 
        Skeletons for:
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
            loading : true,
            clicked: false,
            url: null
        };
        
        this.authlistener = this.authlistener.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.avatarURL = this.avatarURL.bind(this);
        
    }

    
    componentDidMount(){
        this.unsubscribe = this.authlistener();
        this.avatarURL();
        
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

   async avatarURL(){
       const user_ref = ref(storage, 'images/'+ this.props.user);
       console.log(user_ref);
       const url = await getDownloadURL(user_ref);
       console.log(url);
       this.setState({url});
       
   }




    render(){
        
       
        const loading = this.state.loading
        const user = this.state.user
        if (loading) return <div>Loading</div>
        if (user===null) return <Navigate to='../login'/>

        return(
        <div>
        <Grid
            h='1000px'
            templateRows='repeat(10, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={2}
        >
         <GridItem rowSpan={11} colSpan={1} bg='#EF846C'>
         
         <Box color='#141301'>
         <Menu>
             <MenuButton as={Button}> 
             <Avatar name= {user.displayName} src={this.state.url}/> {user.displayName}
             </MenuButton>
             <MenuList>
                <MenuItem as="a" href='./avatar'>Change Avatar</MenuItem>
                <MenuItem as="button" onClick={this.handleLogOut}> Sign Out</MenuItem>
             </MenuList>
         </Menu>
         </Box>
         </GridItem>
         <GridItem colSpan={6} bg='#94C5CC' > </GridItem>
         <GridItem rowSpan={4} colSpan={3} bg='#F8F8F8' > Metadata </GridItem>
         <GridItem rowSpan={7} colSpan={6} bg='#F8F8F8' > Message Panel  </GridItem>
         <GridItem colSpan={6} bg='#2D5676' > 
         <Box >
         <HStack>
         <Input 
         placeholder='Your message here'
         bg='#F8F8F8'
         color='#2D5676'
         size='md'
         />
         <Button as='button'> Send</Button>
         </HStack>
         </Box>
         </GridItem>
        </Grid>
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