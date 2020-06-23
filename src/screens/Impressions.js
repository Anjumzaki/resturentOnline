import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { conStyles, inStyles, btnStyles } from "../styles/styles";
import LatoText from "../components/LatoText";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SingleHeader from "../components/SingleHeader";
export default class Impressions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      hasCameraPermission: null,
      lastScannedUrl: null,
      isUser: false,
      flag: true,
      resData: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SingleHeader
          nameTitle="Impressum"
          navigation={this.props.navigation}
        />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../../assets/icon.png")}
            />
          </View>
          <LatoText
            fontName="robo"
            col="#5072B1"
            fonSiz={18}
            text={"Ppass GbR"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={"Mariahilfstrabe 9"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"94032 Passau"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={"Tel:0171-2275527"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={"E-Mail:info@knusbrecht@gmail.com"}
          />
        </ScrollView>
      </View>
    );
  }
}
