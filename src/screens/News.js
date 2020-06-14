import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  StatusBar,
  Linking,
  LayoutAnimation,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SingleHeader from "../components/SingleHeader";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
    });
  };
  _handleBarCodeRead = (result) => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    var array = [1, 2, 3, 4, 5];
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader nameTitle="News" navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            padding: 10,
          }}
        >
          {array.map((item, index) => (
            <TouchableOpacity
              style={{
                margin: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Image
                style={{ borderRadius: 10, width: 80, height: 80 }}
                source={require("../assets/new.png")}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                    height: 80,
                  }}
                >
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={14}
                    text={"Malanium Restaurant has special offer today for you"}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <LatoText
                      fontName="robo"
                      col="black"
                      fonSiz={12}
                      text={"30 min ago"}
                    />
                    <LatoText fontName="robo" fonSiz={10} text={"View..."} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
