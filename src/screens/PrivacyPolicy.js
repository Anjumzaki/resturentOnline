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
export default class PrivacyPolicy extends React.Component {
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
      <View>
        <SingleHeader
          nameTitle="Terms and Conditions"
          navigation={this.props.navigation}
        />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingBottom:200
          }}
        >
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"1. Anbieter der App"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText fontName="robo" col="gray" fonSiz={18} text={"PPass GbR"} />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"Mariahilfstraße 9"}
          />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"94032 Passau"}
          />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"Tel.: 0171-2275527"}
          />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"E-Mail: info.knusbrecht@gmail.com"}
          />
          <View style={{ marginTop: 20 }} />
          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Durch die Verwendung von unserer App erklären Sie sich mit diesen AGB einverstanden."
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"2. Leistungsinhalt Apps"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Die App PPass stehen dient für den Endnutzer als restaurantübergreifende Stempelkarte. Mit dem Erwerb der App werden die tagesaktuellen Inhalte auf das Gerät geladen. PPass behält sich das Recht vor, die App jederzeit in einer dem Nutzer zumutbaren Art und Weise zu ändern, z.B. um diese weiter zu entwickeln und qualitativ zu verbessern. Dies gilt sowohl für technische als auch inhaltliche Weiterentwicklungen"
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={
              "3. In-App-Käufe (iOS-Geräte/App Store [iTunes] von Apple Inc.)"
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Vorerst können keine In-App-Käufe getätigt werden, können aber durch Weiterentwicklung auftreten."
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"4. Widerrufsrecht"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Für Verbraucher gilt ein 14tägiges Widerrufsrecht. Dieses Widerrufsrecht ist ausschließlich bei den Storeanbietern auszuüben. Es gelten insoweit die Allgemeinen Geschäftsbedingungen/Nutzungsbedingungen der Storeanbieter."
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"5. Haftungsbeschränkung"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "PPass wendet bei der Auswahl, Pflege und Aktualität der Inhalte die üblicherweise zu erwartende Sorgfalt an. Allerdings übernimmt PPass keine Gewähr für die inhaltliche Richtigkeit, Aktualität und Vollständigkeit der zur Verfügung gestellten Inhalte und deren Auswahl sowie Zusammenstellungen. Dies gilt insbesondere auch soweit PPass auf die Zulieferung von Texten Dritter angewiesen ist.Soweit die Verfügbarkeit der App von Leistungen Dritter (Restaurantanbietern) abhängig ist übernimmt PPass keine Haftung."
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={20}
            text={"6. Urheberrecht"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Bei den zusammengestellten Inhalten der App handelt es sich um eigens von PPass hergestellte Datenbankwerke.PPass ist Rechteinhaber bezüglich aller sonstigen Elemente der App, insbesondere hinsichtlich der Nutzungs- und Leistungsschutzrechte an Inhalten und Dokumenten."
            }
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={18}
            text={"7. Schlussbestimmungen"}
          />
          <View style={{ marginTop: 20 }} />

          <LatoText
            fontName="robo"
            col="gray"
            fonSiz={14}
            text={
              "Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sollten einzelne dieser Bestimmungen unwirksam sein oder nachträglich unwirksam werden, berührt dies nicht die Gültigkeit der Bestimmungen insgesamt."
            }
          />
        </ScrollView>
      </View>
    );
  }
}
