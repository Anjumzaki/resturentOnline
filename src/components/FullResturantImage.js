import React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";

class LatoText extends React.Component {
  state = {
    image: "",
  };
  async componentDidMount() {
    const ref = firebase
      .storage()
      .ref("restaurent_images/" + this.props.id + ".jpg");
    ref
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Image
          style={{
            width: "100%",
            marginTop: 20,
            height: 300,
          }}
          resizeMode="contain"
          source={{ uri: this.state.image }}
        />
      </>
    );
  }
}
export default LatoText;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
