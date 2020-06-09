import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

class LatoText extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "robo": require("../assets/fonts/Roboto-Medium.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Text
        style={{
          fontFamily: this.state.fontLoaded ? this.props.fontName : null,
          color: this.props.col ? this.props.col : '#5072B1',
          fontSize: this.props.fonSiz,
          textAlign:this.props.txtAlign && this.props.txtAlign,
          textDecorationLine:this.props.lineThrough && this.props.lineThrough,
          // textDecoration: this.props.lineThrough ? "line-through" : null
        }}
      >
        {this.props.text}
      </Text>
    );
  }
}
export default LatoText;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
