import React, { Component } from "react";
import { auth , database} from "../firebase.js";
import { ref as ref_d, set, onValue, onChildAdded, off, onChildRemoved } from "firebase/database";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Input as Input_s, Button, Form } from "../style";
import { connect } from "react-redux";
import {
  Grid,
  GridItem,
  Box,
  Input,
  HStack,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import Modal from "./Modal.js";

/*    TO DO: 
        Skeletons for:
        6. Logo/App header        
*/

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      clicked: false,
      url: null,
      show: false,
      cname: "",
      cdesc: "",
      channels: []
    };

    this.authlistener = this.authlistener.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.avatarURL = this.avatarURL.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChannelCreation = this.handleChannelCreation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.channellistener = this.channellistener.bind(this);
}

  componentDidMount() {
    this.unsubscribe = this.authlistener();
    this.avatarURL();
    this.channellistener();
  }


  componentWillUnmount() {
    this.unsubscribe();
    this.ref.off();
  }

  authlistener() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        this.setState({ user: user, loading: false });
        console.log(this.state.user);
      } else {
        this.setState({ user: user, loading: false });
        console.log(this.state.user);
      }
    });
  }

  handleLogOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.props.logout();
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ocured: ", errorCode, errorMessage);
      });
  }

  async avatarURL() {
    const user_ref = ref(storage, "images/" + this.props.user);
    console.log(user_ref);
    const url = await getDownloadURL(user_ref);
    console.log(url);
    this.setState({ url });
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  handleChannelCreation() {
    let disp_name = this.state.user.displayName
    let c_name = this.state.cname;
    console.log(this.state.cname);
    console.log(disp_name);
    set(ref_d(database, 'channel/'),{
        [c_name]: { "desc": this.state.cdesc,
        "members" : {
            [disp_name] : true,
        }
    }
} );
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({[event.target.name]: event.target.value});
}

  channellistener(){
    this.ref = ref_d(database, 'channel/');
    console.log(ref);
    onChildAdded(this.ref, (snapshot) => {
      console.log(JSON.parse(snapshot));
      let c_name = snapshot.key;
      const newChannel = snapshot.val();
      console.log('Name: ' + JSON.stringify(newChannel));
      this.state.channels.push({[c_name]:newChannel});
      console.log(this.state.channels);
     
    });
  }

  render() {
    const loading = this.state.loading;
    const user = this.state.user;
    if (loading) return <div>Loading</div>;
    if (user === null) return <Navigate to="../login" />;

    const channels = this.state.channels
        const items = []
        for (const channel of channels){
          console.log(JSON.parse(channel))
            // items.push(
            //     <Button>{channel}</Button>
            // );
        }


    return (
      <div>
        <Grid
          h="1000px"
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(10, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={11} colSpan={1} bg="#EF846C">
            <Box color="#141301">
              <VStack spacing="20px">
                <Menu>
                  <MenuButton as={Button}>
                    <Avatar name={user.displayName} src={this.state.url} />{" "}
                    {user.displayName}
                  </MenuButton>
                  <MenuList>
                    <MenuItem as="a" href="./avatar">
                      Change Avatar
                    </MenuItem>
                    <MenuItem as="button" onClick={this.handleLogOut}>
                      {" "}
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <Box>
                    <h2>Create your channel</h2>
                    <label>Channel Name</label>
                    <Input as="input" type="text" name="cname"value={this.state.cname} onChange={this.handleChange}/>
                    <label>Channel Description</label>
                    <Input as="input" type="text" name="cdesc"value={this.state.cdesc} onChange={this.handleChange} />
                    <Button as="button" onClick={this.handleChannelCreation}>Confirm</Button>
                  </Box>
                </Modal>
                <Button as="button" onClick={this.showModal}>
                  Create Channel
                </Button>
                {items}
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={6} bg="#94C5CC">
            {" "}
          </GridItem>
          <GridItem rowSpan={4} colSpan={3} bg="#F8F8F8">
            {" "}
            Metadata{" "}
          </GridItem>
          <GridItem rowSpan={7} colSpan={6} bg="#F8F8F8">
            {" "}
            Message Panel{" "}
          </GridItem>
          <GridItem colSpan={6} bg="#2D5676">
            <Box>
              <HStack>
                <Input
                  placeholder="Your message here"
                  bg="#F8F8F8"
                  color="#2D5676"
                  size="md"
                />
                <Button as="button"> Send</Button>
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
    loggedIn: state.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
