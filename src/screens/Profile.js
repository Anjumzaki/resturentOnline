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
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      image: "https://picsum.photos/300",
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
                  placeholder="Your Name"
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
                  placeholder="Your Name"
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
                  placeholder="Your Name"
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
