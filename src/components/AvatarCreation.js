import { Button } from "../style";
import { Component } from "react";
import Avatar from "react-avatar-edit";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const images_ref = ref(storage, "images");
/**
 * TODO
 * 1. make it a modal instead
 * 2. fix styling
 * 3. be able to clear url/ use default picture
 */
class AvatarCreation extends Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      preview: null,
      src,
      labelStyle: {
        color: "red",
        fontSize: "24px",
      },
      closed: false,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  onClose() {
    this.setState({ closed: true });
  }

  onCrop(preview) {
    this.setState({ preview, closed: false });
  }

  handleUpdate() {
    const user_ref = ref(images_ref, this.props.user);
    fetch(this.state.preview)
      .then((res) => res.blob())
      .then((blob) => uploadBytes(user_ref, blob))
      .then(this.setState({ preview: null }));
  }

  render() {
    console.log(this.state.closed);
    const preview = this.state.preview;
    const closed = this.state.closed;
    return (
      <div className="editor">
        <h1>AVATAR STUFF</h1>
        <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
          labelStyle={this.state.labelStyle}
        />

        {closed && preview ? (
          <Box background="#F8F8F8">
            <VStack>
              <img src={this.state.preview} alt="Preview" />
              <h3>Do you wish to keep this as your profile picture?</h3>
              <HStack>
                <Button onClick={this.handleUpdate}> Yes </Button>
                <Button
                  onClick={() => {
                    this.setState({ preview: null });
                  }}
                >
                  {" "}
                  No{" "}
                </Button>
              </HStack>
            </VStack>
          </Box>
        ) : null}

        {this.props.loggedIn ? null : <Navigate to="/login" />}
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
export default connect(mapStateToProps)(AvatarCreation);
