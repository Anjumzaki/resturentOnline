import React from "react";
import { StyleSheet, Text, View, Image ,ActivityIndicator} from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
import { chocolate } from "color-name";

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
        {this.state.image != "" ? (
          <Image
            style={{
              width: 220,
              height: 140,
              borderTopRightRadius: 20,
              borderTopRightRadius: 20,
            }}
            source={{ uri: this.state.image }}
          />
        ) : (
          <View style={{ marginVertical: 50 }}>
            <ActivityIndicator color="gray" size="large" />
          </View>
        )}
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
