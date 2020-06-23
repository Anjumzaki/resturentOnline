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
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { Checkbox } from "react-native-paper";
import validator from "email-validator";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      userType: "",
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      checked: false,
    };
  }

  handleSignUp() {
    if (this.state.firstName) {
      if (this.state.lastName) {
        if (this.state.mobile) {
          if (validator.validate(this.state.email.trim())) {
            if (this.state.password) {
              if (this.state.userType) {
                if(this.state.checked){

                  axios
                    .post(
                      "https://warm-plains-33254.herokuapp.com/api/users/signup",
                      {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        mobile: this.state.mobile,
                        email: this.state.email,
                        password: this.state.password,
                        type: this.state.userType,
                      }
                    )
                    .then((resp) => {
                      if (resp.data === "User already exists!") {
                        this.setState({ msg: "User already exists!" });
                      } else {
                        alert("Successfully Registered!");
                        this.setState({
                          userType: "",
                          firstName: "",
                          lastName: "",
                          mobile: "",
                          email: "",
                          password: "",
                        });
                        this.props.navigation.push("Login");
                      }
                    })
                    .catch((err) => console.log(err));
                }
                else{
                this.setState({ msg: "Please accept terms and conditions" });
                  
                }
                
              } else {
                this.setState({ msg: "Please Select Type" });
              }
            } else {
              this.setState({ msg: "Please Enter Password" });
            }
          } else {
            this.setState({ msg: "Please Enter Correct Email" });
          }
        } else {
          this.setState({ msg: "Please Enter Telephone" });
        }
      } else {
        this.setState({ msg: "Please Enter Last Name" });
      }
    } else {
      this.setState({ msg: "Please Enter First Name" });
    }
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
                    text={"Vorname"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                  onChangeText={(firstName) => this.setState({ firstName })}
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
                    text={"Nachname"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                  onChangeText={(lastName) => this.setState({ lastName })}
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
                    text={"Telephone"}
                  />
                </View>
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeild}
                  keyboardType={"number-pad"}
                  onChangeText={(mobile) => this.setState({ mobile })}
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
                  keyboardType={"email-address"}
                  onChangeText={(email) => this.setState({ email })}
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
                  onChangeText={(password) => this.setState({ password })}
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
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  marginVertical: 5,
                  marginBottom: 20,
                }}
              >
                <View
                  style={[
                    inStyles.upperText,
                    { top: -8, backgroundColor: "white" },
                  ]}
                >
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={12}
                    text={"Kunde"}
                  />
                </View>
                <RNPickerSelect
                  style={{
                    viewContainer: {
                      padding: 13,
                    },
                  }}
                  onValueChange={(userType) => this.setState({ userType })}
                  items={[
                    {
                      label: "Restaurant Besitzer",
                      value: "Restaurant Besitzer",
                    },
                    { label: "User", value: "User" },
                  ]}
                />
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                >
                  <Checkbox
                    color="black"
                    status={this.state.checked ? "checked" : "unchecked"}
                    onPress={() => {
                      this.setState({ checked: !this.state.checked });
                    }}
                  />
                </View>
                <View>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={14}
                    text={"I accepted the terms and conditions"}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("PrivacyPolicy")
                    }
                  >
                    <LatoText
                      fontName="robo"
                      col="#5072B1"
                      fonSiz={14}
                      text={"See here.."}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ textAlign: "center", color: "red" }}>
                {this.state.msg}
              </Text>

              <TouchableOpacity
                style={btnStyles.basic}
                onPress={() => this.handleSignUp()}
              >
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
              <TouchableOpacity
                onPress={() => this.props.navigation.push("Login")}
                style={btnStyles.basic}
              >
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
