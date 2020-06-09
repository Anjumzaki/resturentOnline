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
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import MyHeader from "../components/MyHeader";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default class Home extends React.Component {
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
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{ padding: 10 }}
          >
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10 }}
          >
            <LatoText col="white" fontName="robo" fonSiz={20} text={"Home"} />
          </TouchableOpacity>
          <LatoText fontName="robo" fonSiz={18} text={"ads"} />
        </View>
      </View>
    );
  }
}
