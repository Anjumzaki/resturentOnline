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
            text={"Einwilligungserklärung zur Speicherung von Daten"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Ich willige ein, dass die PPass App meine personenbezogenen Daten für das Pflegen der Nutzerbedürfnisse und Marketing-Unterstützung der Unternehmen speichern darf. "
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"Folgende Daten werden aufgenommen und gespeichert:"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={"Vor- & Nachname, Telefonnummer und E-Mail-Adresse"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Die personenbezogenen Daten werden nach dem Austritt noch ein weiteres Jahr gespeichert und nach Ablauf der Frist gelöscht."
            }
          />
          <View style={{ marginTop: 20 }} />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Auf die personenbezogenen Daten hat nur die Geschäftsführung Zugriff. Die Weiterleitung an Dritte erfolgt nicht. Die Daten werden auch nicht in Internet gestellt. "
            }
          />
        </ScrollView>
      </View>
    );
  }
}
