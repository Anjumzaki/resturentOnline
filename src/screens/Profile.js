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
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      image: "",
    };
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
                source={{ uri: "https://picsum.photos/300" }}
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
