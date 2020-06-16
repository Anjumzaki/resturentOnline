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
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import Geocoder from "react-native-geocoding";
import FullResturantImage from '../components/FullResturantImage'
import firebase from "firebase";
Geocoder.init("AIzaSyCYwrgArmp1NxJsU8LsgVKu5De5uCx57dI");
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const options = {
  title: "Select Resturant Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
    menu: "",
  },
};
export default class Stamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
      name: "",
      category: "",
      price: "",
      code: "",
      description: "",
      location: "",
      phone: "",
      phoneError: false,
      nameError: false,
      categoryError: false,
      priceError: false,
      codeError: false,
      descriptionError: false,
      locationError: false,
      msg: "",
    };
  }

  componentDidMount() {
    // alert(JSON.stringify(this.props.route.params.item));
    const rest = this.props.route.params.item;
    this.setState({
      name: rest.name,
      category: rest.category,
      price: rest.stempPrice,
      description: rest.description,
      location: rest.address,
      phone: rest.phoneNumber,
    });
    // this._requestCameraPermission();
  }

  render() {
    console.log(this.state);
    var array = [1, 2, 3, 4, 5];
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader
          nameTitle="View Resturant"
          navigation={this.props.navigation}
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
        >
          <FullResturantImage id={this.props.route.params.item._id}/>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Name"}
                />
                {this.state.nameError && (
                  <LatoText
                    fontName="robo"
                    col="red"
                    fonSiz={16}
                    text={"Please add name"}
                  />
                )}
              </View>
              <TextInput
                placeholder={"Resturant Name"}
                onChangeText={(name) =>
                  this.setState({ name, nameError: false })
                }
                autoCapitalize={"none"}
                value={this.state.name}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <LatoText
                fontName="robo"
                col="black"
                fonSiz={16}
                text={"Category"}
              />
              {this.state.categoryError && (
                <LatoText
                  fontName="robo"
                  col="red"
                  fonSiz={16}
                  text={"Please add Category"}
                />
              )}
            </View>

            <View
              style={{
                backgroundColor: "#EFF3F4",
                borderRadius: 10,
              }}
            >
              <TextInput
                autoCapitalize={"none"}
                value={this.state.category}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>

            <View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Phone Number"}
                />
                {this.state.phoneError && (
                  <LatoText
                    fontName="robo"
                    col="red"
                    fonSiz={16}
                    text={"Please add Phone Number"}
                  />
                )}
              </View>

              <TextInput
                placeholder={"+874 232 32432 "}
                onChangeText={(phone) =>
                  this.setState({ phone, phoneError: false })
                }
                autoCapitalize={"none"}
                value={this.state.phone}
                keyboardType="phone-pad"
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Stemp Price $"}
                />
                {this.state.priceError && (
                  <LatoText
                    fontName="robo"
                    col="red"
                    fonSiz={16}
                    text={"Please add Stemp Price"}
                  />
                )}
              </View>
              <TextInput
                placeholder={"eg. 20"}
                onChangeText={(price) =>
                  this.setState({ price, priceError: false })
                }
                autoCapitalize={"none"}
                value={this.state.price}
                keyboardType="phone-pad"
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>

            <View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <LatoText
                  fontName="robo"
                  col="black"
                  fonSiz={16}
                  text={"Description"}
                />
                {this.state.descriptionError && (
                  <LatoText
                    fontName="robo"
                    col="red"
                    fonSiz={16}
                    text={"Please add Description"}
                  />
                )}
              </View>

              <TextInput
                placeholder={"Description about Restaurant"}
                onChangeText={(description) =>
                  this.setState({ description, descriptionError: false })
                }
                autoCapitalize={"none"}
                value={this.state.description}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <LatoText
                fontName="robo"
                col="black"
                fonSiz={16}
                text={"Address"}
              />
              {this.state.locationError && (
                <LatoText
                  fontName="robo"
                  col="red"
                  fonSiz={16}
                  text={"Please add Address"}
                />
              )}
            </View>

            <View>
              <TextInput
                placeholder={"Description about Restaurant"}
                autoCapitalize={"none"}
                value={this.state.location}
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
