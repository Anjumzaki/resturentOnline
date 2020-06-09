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
const HEIGHT = Dimensions.get("screen").height;
export default class Register extends React.Component {
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
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LatoText fontName="robo" fonSiz={20} text={"Sign Up"} />
            </View>
            <View>
              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Name"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                />
                <FontAwesome5
                  style={inStyles.inputIcon}
                  name="user-alt"
                  size={20}
                  color="black"
                />
              </View>
              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Sur name"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                />
                <FontAwesome5
                  style={inStyles.inputIcon}
                  name="user-alt"
                  size={20}
                  color="black"
                />
              </View>
              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Telepone"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                  keyboardType={'number-pad'}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIcon}
                  name="phone"
                  size={20}
                  color="black"
                />
              </View>
              <View style={inStyles.simple}>
                <View style={inStyles.upperText}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Email"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                  keyboardType={'email-address'}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIcon}
                  name="email-outline"
                  size={30}
                  color="black"
                />
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
              <TouchableOpacity style={btnStyles.basic}>
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Register"}
                />
              </TouchableOpacity>
              
            </View>
            <View style={{ justifyContent: "center" }}>
              <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={14}
                  text={"Already have an account?"}
                />
              </View>

              <TouchableOpacity onPress={()=>this.props.navigation.push('Login')} style={btnStyles.basic}>
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Login"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
