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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import validator from "email-validator";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      email: "",
      password: "",
      msg: "",
    };
  }

  handleLogin() {
    if (validator.validate(this.state.email.trim())) {
      if (this.state.password) {
        axios
          .post("https://warm-plains-33254.herokuapp.com/api/users/signin", {
            password: this.state.password,
            email: this.state.email,
          })
          .then((resp) => {
            if (resp.data.user) {
              this.setState(
                {
                  isSecure: true,
                  email: "",
                  password: "",
                  msg: "",
                },
                () => {
                  this.props.userAsync(resp.data);
                  this.props.navigation.push("App");
                }
              );
            } else {
              this.setState({ msg: resp.data });
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.setState({ msg: "Please Enter Password" });
      }
    } else {
      this.setState({ msg: "Please Enter Correct Email" });
    }
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {});
  }
  componentWillUnmount() {
    this._unsubscribe();
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
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LatoText fontName="robo" fonSiz={20} text={"Login"} />
            </View>
            <View>
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
                  keyboardType="email-address"
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
              <Text style={{ textAlign: "center", color: "red" }}>
                {this.state.msg}
              </Text>

              <TouchableOpacity
                onPress={() => this.handleLogin()}
                style={btnStyles.basic}
              >
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Login"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.push("ForgotPass")}
                style={{ alignItems: "flex-end", paddingTop: 5 }}
              >
                <LatoText
                  fontName="robo"
                  col="#46BAF6"
                  fonSiz={14}
                  text={"Forgot Password?"}
                />
              </TouchableOpacity>
              <View style={{ paddingVertical: 15 }}>
                <Image
                  style={{ width: "100%" }}
                  resizeMode="contain"
                  source={require("../assets/loginWith.png")}
                />
              </View>
              <TouchableOpacity
                style={[
                  btnStyles.basic,
                  { backgroundColor: "white", alignItems: "center" },
                ]}
              >
                <Image
                  style={{ position: "absolute", left: 10 }}
                  source={require("../assets/google.png")}
                />
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={14}
                  text={"Google"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center" }}>
              <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={14}
                  text={"Don't have an account?"}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
                style={btnStyles.basic}
              >
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Register"}
                />
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
