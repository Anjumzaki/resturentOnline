import React from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import LatoText from "../components/LatoText";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MyHeader from "../components/MyHeader";
import { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import MyCustomMarkerView from "../components/MyCustomMarkerView";
import { Callout } from "react-native-maps";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import RestaurentImage from "../components/RestaurentImage";
import CalloutImage from "../components/CalloutImage";
console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 48.5667,
        longitude: 13.4319,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      region: {
        latitude: 48.5667,
        longitude: 13.4319,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      categ: 0,
      restaurents: [],
    };
  }
  async componentDidMount() {
    console.log("redux data", this.props.user);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
    });

    axios
      .get("http://192.168.18.5:3000/get/restaurent/")
      .then((resp) => this.setState({ restaurents: resp.data }))
      .catch((err) => console.log(err));
  }
  onMyLocation = async () => {
    let region = await Location.getCurrentPositionAsync({});
    this.setState({
      region,
    });
  };
  onRegionChange(region) {
    this.setState({ region });
  }
  onRegionChange = (region) => {
    this.setState({
      region,
      regionChangeProgress: true,
    });
  };
  render() {
    var myArr = [1, 2, 3, 4, 5, 6, 7];
    var filters = ["All", "Fast Food", "Beverages", "Hotel", "Steaks"];
    return this.state.region ? (
      <>
        <View style={styles.container}>
          <MyHeader navigation={this.props.navigation} />
          <View style={{ flex: 1 }}>
            <MapView
              showsUserLocation={true}
              initialRegion={this.state.region}
              region={this.state.region}
              style={styles.mapStyle}
              // onRegionChangeComplete={this.onRegionChange}
            >
              <Marker
                coordinate={this.state.region}
                title={"Your location"}
              ></Marker>
              {this.state.restaurents.map((item, index) => (
                <Marker
                  coordinate={{
                    latitude: item.lat,
                    longitude: item.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  title={"Resturant Location"}
                  image={require("../assets/rsz_pin.png")}
                >
                  <Callout>
                    <View style={{ flexDirection: "row" }}>
                      <CalloutImage id={item._id} />
                      <View>
                        <Text style={{ paddingLeft: 10, width: 130 }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{ paddingLeft: 10, width: 130, fontSize: 10 }}
                        >
                          {item.description}
                        </Text>
                        {/* <Text
                          style={{ paddingLeft: 10, width: 130, fontSize: 12 }}
                        >
                          Rating: 5
                        </Text> */}
                      </View>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            <View style={styles.topScroll}>
              <ScrollView
                ref={(snapScroll) => {
                  this.snapScroll = snapScroll;
                }}
                horizontal={true}
                decelerationRate={0}
                scrollEventThrottle={32}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {filters.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        categ: index,
                      })
                    }
                    key={index}
                    style={
                      this.state.categ == index
                        ? {
                            padding: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#5072B1",
                            borderRadius: 100,
                            marginHorizontal: 10,
                            borderColor: "#5072B1",
                            borderWidth: 1,
                          }
                        : {
                            padding: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "white",
                            borderRadius: 100,
                            marginHorizontal: 10,
                            borderColor: "#5072B1",
                            borderWidth: 1,
                          }
                    }
                    Î
                  >
                    <Text
                      style={
                        this.state.categ == index
                          ? { color: "white" }
                          : { color: "#5072B1" }
                      }
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.botomScroll}>
              <View
                style={{
                  alignItems: "flex-end",
                  position:'absolute',
                  top:-20,
                  right:0
                }}
              >
                <View style={{ paddingRight: 20 }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 100,
                      borderColor: "#5072B1",
                      borderWidth: 2,
                      width:50,
                      height:50,
                      justifyContent:'center',
                      alignItems:'center'
                    }}
                    onPress={() => this.onMyLocation()}
                  >
                    <Ionicons name="md-locate" size={24} color="#5072B1" />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                ref={(snapScroll) => {
                  this.snapScroll = snapScroll;
                }}
                horizontal={true}
                decelerationRate={0}
                scrollEventThrottle={32}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.restaurents.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        region: {
                          latitude: item.lat,
                          longitude: item.lng,
                          latitudeDelta: item.lat,
                          longitudeDelta: item.lng,
                        },
                      })
                    }
                    key={index}
                    style={styles.card}
                  >
                    <RestaurentImage id={item._id} />
                    <View style={{ padding: 5, paddingHorizontal: 10 }}>
                      <LatoText
                        fontName="robo"
                        col="gray"
                        fonSiz={14}
                        text={item.name}
                      />
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  botomScroll: {
    position: "absolute",
    bottom: 30,
    height: 300,
    width: "100%",
    justifyContent: "center",

  },
  topScroll: {
    position: "absolute",
    width: "100%",
    margin: 10,
    justifyContent: "center",
  },
  card: {
    width: 220,
    height: 200,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  mapMarkerContainer: {
    left: "45%",
    position: "absolute",
    top: "50%",
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
