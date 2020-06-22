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
// function CustomDrawerContent(props)
export default class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "https://picsum.photos/200",
    };
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
              text={"Anjum Zaki"}
            />
            <LatoText
              col="#FFFFFF"
              fontName={"robo"}
              fonSiz={10}
              text={"zakianjummuneer@gmail.com"}
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
