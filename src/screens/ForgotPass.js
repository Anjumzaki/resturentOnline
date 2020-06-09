import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            minHeight: HEIGHT,
          }}
        >
          <View style={conStyles.imageTop}>
            <Image
              style={{ width: WIDTH }}
              source={require("../assets/upper.png")}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                padding: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                backgroundColor: "white",
                borderRadius:10
              }}
            >
              <View style={{ alignItems: "center", marginVertical: 20 }}>
                <LatoText fontName="robo" fonSiz={20} text={"Reset Password"} />
              </View>

              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Password"}
                  />
                </View>
                <TextInput
                  secureTextEntry={this.state.isSecure}
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                />
                <TouchableHighlight
                  underlayColor="transparent"
                  style={{
                    position: "absolute",
                    right: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      isSecure: !this.state.isSecure,
                    });
                  }}
                >
                  {this.state.isSecure ? (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={30}
                      color="black"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={30}
                      color="black"
                    />
                  )}
                </TouchableHighlight>
              </View>
              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Confirm Password"}
                  />
                </View>
                <TextInput
                  secureTextEntry={this.state.isSecure}
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                />
                <TouchableHighlight
                  underlayColor="transparent"
                  style={{
                    position: "absolute",
                    right: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      isSecure: !this.state.isSecure,
                    });
                  }}
                >
                  {this.state.isSecure ? (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={30}
                      color="black"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={30}
                      color="black"
                    />
                  )}
                </TouchableHighlight>
              </View>
              <TouchableOpacity
                style={[btnStyles.basic, { marginVertical: 20 }]}
              >
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"RESET"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
