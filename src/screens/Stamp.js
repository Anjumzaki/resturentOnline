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
  StyleSheet,
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
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from "axios";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
      isUser: false,
      flag: true,
      resData: "",
    };
  }

  componentDidMount() {
    if (this.props.user.user.type === "User") {
      this.setState({ isUser: true });
    }
    this._requestCameraPermission();
    axios
      .get(
        "https://warm-plains-33254.herokuapp.com/get/restaurent/" +
          this.props.user.user._id
      )
      .then((resp) => this.setState({ resData: resp.data }));
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
    });
  };
  handleBarCodeScanned = (result) => {
    if (result.data !== this.state.lastScannedUrl && this.state.flag) {
      this.setState({flag: false})
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
      axios.put("http://192.168.0.108:3000/edit/user/"+this.props.user.user._id+"/"+parseInt(parseInt(this.props.user.user.scanCount)+1))
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err))
      if(parseInt(parseInt(this.props.user.user.scanCount)+1)>10){
          alert("Ein kostenloses Essen wartet auf Sie.")
          axios.put("http://192.168.0.108:3000/edit/user/"+this.props.user.user._id+"/"+0)
          .then(resp => console.log(resp.data))
          .catch(err => console.log(err))
      }
    }
    // alert("asdas");
  };

  render() {
    var array = [];

    for (var i = 0; i < this.props.user.user.scanCount; i++) {
      array.push(i);
    }
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
                    width: WIDTH / 4 - 20,
                    height: WIDTH / 4 - 20,
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
          {this.state.isUser && (
            <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
              <LatoText
                fontName="robo"
                col="black"
                fonSiz={20}
                text={"Sie haben " + this.props.user.user.scanCount + " Stempel"}
              />
              {this.props.user.user.scanCount > 10 ? (
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={20}
                  text={"Scan your stamp and get the free meal"}
                />
              ) : (
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={20}
                  text={
                    "Sie brauchen noch  " +
                    (10 - this.props.user.user.scanCount) +
                    " um ein kostenloses Essen zubekommen."
                  }
                />
              )}
            </View>
          )}

          {this.state.isUser ? (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("QrCodeScreen", {
                    count: this.props.user.user.scanCount,
                    user: this.props.user.user._id,
                  })
                }
                style={[btnStyles.basic, { paddingHorizontal: 20 }]}
              >
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={20}
                  text={"Scan the Qr Here"}
                />
              </TouchableOpacity>
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
                value={this.state.resData ? this.state.resData._id : ""}
                size={200}
                bgColor="black"
                fgColor="white"
              />
              <View style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={18}
                  text={
                    // "Reciasdve " +
                    // (this.state.resData
                    //   ? this.state.resData.stempPrice
                    //   : 0 + "$ from customer")
                    "Diesen Qr-Code bitte den Kunden zeigen"
                  }
                />
              </View>
            </View>
          )}
          <Text>{this.state.lastScannedUrl && this.state.lastScannedUrl}</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.push("App")}
              style={[btnStyles.basic, { position: "absolute", bottom: 10 }]}
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
const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.userLoading,
  error: state.user.userError,
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Stamp);
