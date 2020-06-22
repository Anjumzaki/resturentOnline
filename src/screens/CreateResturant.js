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
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
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

class Stamp extends React.Component {
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
      resData: false
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
    axios.get('http://192.168.0.108:3000/get/restaurent/'+this.props.user.user._id)
    .then(resp => {
      console.log("ssssssss",resp.data)
      if(resp.data !== null){
        this.setState({resData: true})
      }
    })
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
  pickUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        menu: result.uri,
      });
    }
  };

  async uploadMenu(id){
    const response = await fetch(
      this.state.menu
    );
    const blob1 = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child(
        "menu_images/" +
          id +
          ".jpg"
      );
    return ref.put(blob1);
                                  
                                  
  }

  handleSubmission() {
    console.log("SDDDDDDDDDDDDDDDDDD");
    this.setState({ loading: true }, () => {
      if (this.state.name.trim()) {
        if (this.state.category.trim()) {
          if (this.state.phone.trim()) {
            if (this.state.price.trim()) {
              if (this.state.code.trim()) {
                if (this.state.description.trim()) {
                  if (this.state.location) {
                    Geocoder.from(this.state.location)
                      .then((json) => {
                        var location = json.results[0].geometry.location;                  

                        axios
                          .get(
                            "http://192.168.0.108:3000/get/inviteCode/" +
                              this.state.code
                          )
                          .then((resp) => {
                            console.log(resp.data);
                            if (resp.data !== null) {
                              axios
                                .post(
                                  "http://192.168.0.108:3000/add/restaurent",
                                  {
                                    name: this.state.name,
                                    category: this.state.category,
                                    phoneNumber: this.state.phone,
                                    stempPrice: this.state.price,
                                    inviteCode: this.state.code,
                                    description: this.state.description,
                                    address: this.state.location,
                                    userId: this.props.user.user._id,
                                    lat: location.lat,
                                    lng: location.lng,
                                  }
                                )
                                .then(async (resp) => {
                                  console.log(resp.data);
                                  this.uploadMenu(resp.data.restaurent._id)


                                  const response = await fetch(
                                    this.state.image
                                  );
                                  const blob = await response.blob();
                                  var ref = firebase
                                    .storage()
                                    .ref()
                                    .child(
                                      "restaurent_images/" +
                                        resp.data.restaurent._id +
                                        ".jpg"
                                    );
                                  return ref.put(blob);
                                  
                                  
                                 
                                })
                                .catch((err) => console.log(err));
                              this.setState({
                                msg1: "Restaurent added Successfully",
                                name: "",
                                category: "",
                                price: "",
                                code: "",
                                description: "",
                                location: "",
                                phone: "",
                                image: ""
                              });
                            } else {
                              this.setState({ msg: "Invalid Invite Code!" });
                            }
                          });
                      })
                      .catch((error) => console.warn(error));

                    // this.setState(
                    //   {
                    //     loading: false,
                    //   },
                    //   alert("done")
                    // );
                  } else {
                    this.setState({
                      locationError: true,
                      loading: false,
                    });
                  }
                } else {
                  this.setState({
                    descriptionError: true,
                    loading: false,
                  });
                }
              } else {
                this.setState({
                  codeError: true,
                  loading: false,
                });
              }
            } else {
              this.setState({
                priceError: true,
                loading: false,
              });
            }
          } else {
            this.setState({
              phoneError: true,
              loading: false,
            });
          }
        } else {
          this.setState({
            categoryError: true,
            loading: false,
          });
        }
      } else {
        this.setState({
          nameError: true,
          loading: false,
        });
      }
    });
  }
  render() {
    console.log(this.state);
    var array = [1, 2, 3, 4, 5];
    return (
      <SafeAreaView style={conStyles.safeAreaMy}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SingleHeader
          nameTitle="Create Resturant"
          navigation={this.props.navigation}
        />
        {this.state.resData ? (
          <Text style={{textAlign: "center", fontWeight: "bold"}}>You have already created a restaurant</Text>
        ): (
        <ScrollView
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
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
                source={require("../assets/restu.png")}
              />
            </TouchableOpacity>
          )}
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
              <RNPickerSelect
                style={{
                  viewContainer:
                    Platform.OS == "ios"
                      ? {
                          padding: 15,
                        }
                      : {
                          padding: 0,
                        },
                }}
                onValueChange={(category) =>
                  this.setState({ category, categoryError: false })
                }
                items={[
                  { label: "All", value: "All" },
                  { label: "Fast Food", value: "Fast Food" },
                  { label: "Beverages", value: "Beverages" },
                  { label: "Hotel", value: "Hotel" },
                  { label: "Steaks", value: "Steaks" },
                ]}
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
                  text={"Invite code"}
                />
                {this.state.codeError && (
                  <LatoText
                    fontName="robo"
                    col="red"
                    fonSiz={16}
                    text={"Please add invite code"}
                  />
                )}
              </View>
              <TextInput
                placeholder={"eg. 123456"}
                onChangeText={(code) =>
                  this.setState({ code, codeError: false })
                }
                autoCapitalize={"none"}
                value={this.state.code}
                keyboardType="phone-pad"
                style={{
                  padding: 15,
                  backgroundColor: "#EFF3F4",
                  borderRadius: 10,
                }}
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
                onPress={(details) => {
                  this.setState({
                    location: details.description,
                    locationError: false,
                  });
                }}
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
                <View style={{ paddingVertical: 10 }}>
                  <LatoText
                    fontName="robo"
                    col="black"
                    fonSiz={16}
                    text={"Upload Menu"}
                  />
                </View>
                {this.state.menu ? (
                  <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <MaterialIcons name="done" size={24} color="green" />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.pickUpload()}
                    style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                  >
                    <FontAwesome5 name="upload" size={24} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {this.state.msg}
            </Text>
            <Text style={{ textAlign: "center", color: "green" }}>
              {this.state.msg1}
            </Text>

            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => this.handleSubmission()}
                style={btnStyles.basic}
              >
                <LatoText
                  fontName="robo"
                  col="white"
                  fonSiz={14}
                  text={"Create"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Stamp);