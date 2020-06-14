import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import LatoText from "../components/LatoText";

export default class MyCustomMarkerView extends React.Component {
  render() {
    return (
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 20,
          backgroundColor: "white",
        }}
      ></View>
    );
  }
}
