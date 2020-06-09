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
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
const WIDTH = Dimensions.get("screen").width;
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
      <View
        style={{ paddingTop: getStatusBarHeight(), backgroundColor: "#5072B1" }}
      >
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{ padding: 10 ,paddingVertical:15}}
            onPress={() => this.props.navigation.goBack()}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ padding: 10,paddingVertical:15 }}>
            <LatoText
              col="white"
              fontName="robo"
              fonSiz={18}
              text={this.props.nameTitle}
            />
          </View>
          <View style={{ padding: 10 }}>
            <LatoText fontName="robo" fonSiz={18} text={' ad'} />
          </View>
        </View>
      </View>
    );
  }
}
