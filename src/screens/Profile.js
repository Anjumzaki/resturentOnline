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
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from "axios";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      image: "https://picsum.photos/300",
      firstName: "",
      lastName: "",
      email: "",
      moble: "",
    };
  } 

  componentDidMount(){
    console.log("userssssssssss",this.props.user)
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
        // this.setState({resData: true,
        //   id: resp.data._id,
        //   name: resp.data.name,
        //   category: resp.data.category,
        //   phone: resp.data.phoneNumber,
        //   price: resp.data.stempPrice,
        //   code: resp.data.inviteCode,
        //   description: resp.data.description,
        //   location: resp.data.address,
        //   lat: resp.data.lat,
        //   lng: resp.data.lng,
        // })
      }
    })
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
            <View>
              <Image
                style={{ width: WIDTH, height: HEIGHT / 2.5 }}
                resizeMode="cover"
                source={{ uri: this.state.image }}
              />
            </View>
            <View style={{ position: "relative", bottom: 55, left: "10%" }}>
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 120,
                  borderColor: "rgba(255,255,255,0.5)",
                  borderWidth: 5,
                }}
                resizeMode="cover"
                source={{ uri: this.state.image }}
              />
            </View>
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
              <TouchableOpacity style={[btnStyles.basic, { marginTop: 20 }]}>
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