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
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from "axios";
import validator from "email-validator";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      image: "",
      msg: "",
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      uri: ""
    };
  }

  componentDidMount(){
    axios.get('http://192.168.0.108:3000/get/user/'+this.props.user.user._id)
    .then(resp => {
      console.log("ssssssss",resp.data)
      if(resp.data !== null){
        this.setState({
          firstName: resp.data.firstName,
          lastName: resp.data.lastName,
          mobile: resp.data.mobile,
          email: resp.data.email,
        })
        const ref = firebase
        .storage()
        .ref("/profile_images/"+this.props.user.user._id+".jpg");
        ref.getDownloadURL().then(url => {
            console.log("urllllll",url)
          this.setState({ uri: url });
        }).catch(err => console.log(err));
      }
    })
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
    }
  };

  handleUserUpdate(){
    if (this.state.firstName) {
      if (this.state.lastName) {
        if (this.state.mobile) {
          if (validator.validate(this.state.email.trim())) {

                  axios
                    .put(
                      "http://192.168.0.108:3000/edit/user/"+this.props.user.user._id,
                      {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        mobile: this.state.mobile,
                        email: this.state.email
                      }
                    )
                    .then(async (resp) => {
                      console.log("res", resp.data);
                      this.setState({
                        msg: "User Updated Successfully"
                      })
                      console.log("beforeeeee")
                      if(this.state.image){
                        console.log("in image update")
                        const response = await fetch(
                          this.state.image
                        );
                        const blob = await response.blob();
                        var ref = firebase
                          .storage()
                          .ref()
                          .child(
                            "profile_images/" +
                            this.props.user.user._id +
                              ".jpg"
                          );
                         
                        return ref.put(blob);
                        
                      }
                     
                    })
                    .catch((err) => console.log(err));
                
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
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            minHeight: HEIGHT,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            {this.state.image ? (
              <Image
                style={{ width: "100%", height: 200 }}
                source={{ uri: this.state.image }}
              />
            ) : (
              <TouchableOpacity onPress={() => this.pickImage()}>
                <Image
                  style={{ width: "100%", height: 200 }}
                  source={{ uri: "https://picsum.photos/300" }}
                />
              </TouchableOpacity>
            )}

            {/* <View style={{ position: "relative", bottom: 55, left: "10%" }}>
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 120,
                  borderColor: "rgba(255,255,255,0.5)",
                  borderWidth: 5,
                }}
                resizeMode="cover"
                source={{ uri: "https://picsum.photos/300" }}
              />
            </View> */}
            <View style={{ paddingHorizontal: 20 }}>
              <View style={inStyles.simplePro}>
                <Image
                  style={inStyles.leftIcon}
                  source={require("../assets/profile.png")}
                />
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeildPro}
                  value={this.state.firstName}
                  placeholder="Your First Name"
                  onChangeText={(firstName) => this.setState({firstName})}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIconPro}
                  name="pencil"
                  size={20}
                  color="#9E9E9E"
                />
              </View>
              <View style={inStyles.simplePro}>
                <Image
                  style={inStyles.leftIcon}
                  source={require("../assets/profile.png")}
                />
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeildPro}
                  placeholder="Your Last Name"
                  value={this.state.lastName}
                  onChangeText={(lastName) => this.setState({lastName})}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIconPro}
                  name="pencil"
                  size={20}
                  color="#9E9E9E"
                />
              </View>
              <View style={inStyles.simplePro}>
                <Image
                  style={inStyles.leftIcon}
                  source={require("../assets/message.png")}
                />
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeildPro}
                  placeholder="Your Email"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIconPro}
                  name="pencil"
                  size={20}
                  color="#9E9E9E"
                />
              </View>
              <View style={inStyles.simplePro}>
                <Image
                  style={inStyles.leftIcon}
                  source={require("../assets/phone.png")}
                />
                <TextInput
                  autoCapitalize={"none"}
                  style={inStyles.innerFeildPro}
                  placeholder="Your Mobile"
                  value={this.state.mobile}
                  onChangeText={(mobile) => this.setState({mobile})}
                />
                <MaterialCommunityIcons
                  style={inStyles.inputIconPro}
                  name="pencil"
                  size={20}
                  color="#9E9E9E"
                />
              </View>
              <Text style={{ textAlign: "center", color: "green" }}>
              {this.state.msg}
            </Text>
              <TouchableOpacity style={[btnStyles.basic, { marginTop: 20 }]} onPress={() => this.handleUserUpdate()}>
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Update Profile"}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);