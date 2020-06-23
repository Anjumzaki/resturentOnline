import React from "react";
import { View, Text, LayoutAnimation } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
export default class QrCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScannedUrl: "",
      flag: true,
      user: "",
      count: ",",
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.route.params.user,
      count: this.props.route.params.count,
    });
  }
  handleBarCodeScanned = (result) => {
    if (result.data !== this.state.lastScannedUrl && this.state.flag) {
      this.setState({ flag: false });
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
      axios
        .put(
          "https://warm-plains-33254.herokuapp.com/edit/user/" +
            this.state.user +
            "/" +
            parseInt(parseInt(this.state.count) + 1)
        )
        .then((resp) => console.log(resp.data))
        .then(() => alert("Done"))
        .then(() =>
          this.setState(
            {
              lastScannedUrl: "",
              flag: true,
              user: "",
              count: ",",
            },
            () => this.props.navigation.navigate("Home")
          )
        )
        .catch((err) => console.log(err));
      if (parseInt(parseInt(this.state.count) + 1) > 10) {
        alert("Ein kostenloses Essen wartet auf Sie.");
        axios
          .put(
            "https://warm-plains-33254.herokuapp.com/edit/user/" +
              this.props.user.user._id +
              "/" +
              0
          )
          .then((resp) => console.log(resp.data))
          .catch((err) => console.log(err));
      }
    }
  };
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
    );
  }
}
