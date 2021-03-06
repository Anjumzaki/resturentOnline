import React, { Component } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Image, Text } from "react-native";
import LatoText from "../components/LatoText";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
// function CustomDrawerContent(props)
class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "https://picsum.photos/200",
    };
  }

  componentDidMount(){
    const ref = firebase
    .storage()
    .ref("/profile_images/"+this.props.user.user._id+".jpg");
    ref.getDownloadURL().then(url => {
      this.setState({ image: url });
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <DrawerContentScrollView
        style={{
          backgroundColor: "white",
          marginTop: -getStatusBarHeight() - 10,
        }}
        {...this.props}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingVertical: 20,
            marginBottom: 30,
            backgroundColor: "#5072B1",
            paddingTop: getStatusBarHeight() + 20,
          }}
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <View>
            {this.state.image != "" && (
              <Image
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 100,
                  borderColor: "white",
                  borderWidth: 2,
                }}
                source={{ uri: this.state.image }}
              />
            )}
          </View>

          <View style={{ paddingLeft: 10 }}>
            <LatoText
              col="#FFFFFF"
              fontName={"robo"}
              fonSiz={20}
              text={this.props.user.user.firstName}
            />
            <LatoText
              col="#FFFFFF"
              fontName={"robo"}
              fonSiz={10}
              text={this.props.user.user.email}
            />
          </View>
        </TouchableOpacity>
        <DrawerItemList style={{ backgroundColor: "white" }} {...this.props} />
        <View
          style={{
            borderTopColor: "silver",
            borderTopWidth: 1,
            marginVertical: 40,
          }}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Impressions")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 18,
            paddingVertical: 12,
          }}
        >
          <MaterialCommunityIcons
            style={{ paddingRight: 30 }}
            name="security"
            size={26}
            color="#707070"
          />
          <Text style={{ fontWeight: "700", color: "#707070" }}>Impressum</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 18,
            paddingVertical: 12,
          }}
        >
          <MaterialCommunityIcons
            style={{ paddingRight: 30 }}
            name="star"
            size={26}
            color="#707070"
          />
          <Text style={{ fontWeight: "700", color: "#707070" }}>Rate Us</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 18,
            paddingVertical: 12,
          }}
        >
          <SimpleLineIcons
            style={{ paddingRight: 30 }}
            name="logout"
            size={26}
            color="#707070"
          />
          <Text style={{ fontWeight: "700", color: "#707070" }}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);