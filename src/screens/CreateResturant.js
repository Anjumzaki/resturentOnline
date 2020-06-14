import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  StatusBar,
  Linking,
  LayoutAnimation,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SingleHeader from "../components/SingleHeader";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const options = {
  title: "Select Resturant Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};
export default class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    if (Platform.OS == "ios") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
    var array = [1, 2, 3, 4, 5];
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader
          nameTitle="Create Resturant"
          navigation={this.props.navigation}
        />
        <ScrollView nestedScrollEnabled={true}>
          {this.state.image ? (
            <Image
              style={{ width: "100%", height: 200 }}
              source={{ uri: this.state.image }}
            />
          ) : (
            <TouchableOpacity onPress={() => this.pickImage()}>
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("../assets/restu.png")}
              />
            </TouchableOpacity>
          )}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <View>
              <View style={{ marginVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Name"}
                />
              </View>
              <TextInput
                placeholder={"Resturant Name"}
                onChangeText={(name) => this.setState(name)}
                autoCapitalize={"none"}
                value={this.state.name}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <View style={{ marginVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Category"}
                />
              </View>
              <TextInput
                placeholder={"Category Name"}
                onChangeText={(category) => this.setState(category)}
                autoCapitalize={"none"}
                value={this.state.category}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <View style={{ marginVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Phone Number"}
                />
              </View>
              <TextInput
                placeholder={"+874 232 32432 "}
                onChangeText={(phone) => this.setState(phone)}
                autoCapitalize={"none"}
                value={this.state.phone}
                keyboardType="phone-pad"
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <View style={{ marginVertical: 10 }}>
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Description"}
                />
              </View>
              <TextInput
                placeholder={"Description about Restaurant"}
                onChangeText={(description) => this.setState(description)}
                autoCapitalize={"none"}
                value={this.state.description}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <LatoText
                fontName="robo"
                col="black"
                fonSiz={16}
                text={"Address"}
              />
            </View>
            <View style={{ height: 300 }}>
              <GooglePlacesAutocomplete
                styles={{
                  powered: {
                    display: "none",
                  },
                  textInputContainer: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: "#EFF3F4",
                    fontSize: 20,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    fontSize: 16,
                    backgroundColor: "#EFF3F4",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                  listView: {
                    color: "white",
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    marginBottom: -20,
                    marginTop: 20,
                  },
                  poweredContainer: {
                    display: "none",
                  },
                }}
                listUnderlayColor="green"
                placeholder="Search locations here"
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                query={{
                  key: "AIzaSyCYwrgArmp1NxJsU8LsgVKu5De5uCx57dI",
                  language: "en",
                }}
                onPress={(data, details) => {
                  this.setState({ location: details.description });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
