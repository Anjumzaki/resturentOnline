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
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-generator";
import * as Permissions from "expo-permissions";
const WIDTH = Dimensions.get("screen").width;

const HEIGHT = Dimensions.get("screen").height;
export default class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
      isUser: false,
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
    var array = [1, 2, 3, 4];
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader
          nameTitle="Stempelkarte"
          navigation={this.props.navigation}
        />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {this.state.isUser && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {array.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: WIDTH / 3 - 20,
                    height: WIDTH / 3 - 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: "60%", height: "60%" }}
                    source={require("../assets/stemp.png")}
                  />
                </View>
              ))}
            </View>
          )}
          {this.state.isUser ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {this.state.hasCameraPermission === null ? (
                <Text>Requesting for camera permission</Text>
              ) : this.state.hasCameraPermission === false ? (
                <Text style={{ color: "#fff" }}>
                  Camera permission is not granted
                </Text>
              ) : (
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: WIDTH / 1.4,
                    width: WIDTH / 1.4,
                  }}
                />
              )}
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <QRCode
                value={"Anjum is going to Andrease premium resturant"}
                size={200}
                bgColor="black"
                fgColor="white"
              />
              <View style={{ paddingVertical: 30 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={18}
                  text={"Recive 10$ from customer"}
                />
              </View>
            </View>
          )}
          <Text>{this.state.lastScannedUrl && this.state.lastScannedUrl}</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.push("App")}
              style={btnStyles.basic}
            >
              <LatoText
                fontName="robo"
                col="white"
                fonSiz={14}
                text={"Place CAMERA  CODE"}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
