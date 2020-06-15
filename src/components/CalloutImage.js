import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase"
import * as Font from "expo-font";

class CalloutImage extends React.Component {
  state = {
    image : ""
  };
  async componentDidMount() {
      console.log("id",this.props.id)
    const ref = firebase
    .storage()
    .ref("/restaurent_images/"+this.props.id+".jpg");
  ref.getDownloadURL().then(url => {
      console.log("urllllll",url)
    this.setState({ image: url });
  });
  }

  render() {
    return (
        <Image
        style={{
          width: 50,
          height: 50,
          borderTopRightRadius: 20,
          borderTopRightRadius: 20,
        }}
        source={{uri: this.state.image}}
      />
    );
  }
}
export default CalloutImage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});