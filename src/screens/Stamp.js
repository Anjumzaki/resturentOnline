import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("screen").width;
import SingleHeader from "../components/SingleHeader";

const HEIGHT = Dimensions.get("screen").height;
export default class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader nameTitle="Stempelkarte" navigation={this.props.navigation}/>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <Text>Stamp</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
