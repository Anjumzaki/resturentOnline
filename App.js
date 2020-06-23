import "react-native-gesture-handler";
import * as React from "react";
import { Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPass from "./src/screens/ForgotPass";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Stamp from "./src/screens/Stamp";
import News from "./src/screens/News";
import { Ionicons } from "@expo/vector-icons";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { AntDesign } from "@expo/vector-icons";
import CreateResturant from "./src/screens/CreateResturant";
import ViewResturant from "./src/screens/ViewResturant";
import QrCodeScreen from "./src/screens/QrCodeScreen";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import Impressions from "./src/screens/Impressions";
import store from "./src/store";
import { Provider as StoreProvider } from "react-redux";
import Fire from "./src/config/Fire";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
const Stack = createStackNavigator();

function LoginAuth() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <HomeRoutes.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
const HomeRoutes = createStackNavigator();

function HomeSreen() {
  return (
    <HomeRoutes.Navigator headerMode="none">
      <HomeRoutes.Screen
        name="Home"
        options={{ title: "Restaurant" }}
        component={Home}
      />
      <HomeRoutes.Screen name="Profile" component={Profile} />
      <HomeRoutes.Screen name="Stempelkarte" component={Stamp} />
      <HomeRoutes.Screen name="News" component={News} />
      <HomeRoutes.Screen name="Create Resturant" component={CreateResturant} />
      <HomeRoutes.Screen name="View Resturant" component={ViewResturant} />
      <HomeRoutes.Screen name="QrCodeScreen" component={QrCodeScreen} />
      <HomeRoutes.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <HomeRoutes.Screen name="Impressions" component={Impressions} />
    </HomeRoutes.Navigator>
  );
}
const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator
    headerMode={"none"}
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          return (
            <AntDesign
              name="home"
              size={26}
              color={focused ? "#5072B1" : "#707070"}
            />
          );
        } else if (route.name === "Profile") {
          return (
            <AntDesign
              name="user"
              size={26}
              color={focused ? "#5072B1" : "#707070"}
            />
          );
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: "#5072B1",
      inactiveTintColor: "#707070",
    }}
  >
    <Tabs.Screen
      name="Home"
      options={{ title: "Restaurant" }}
      component={HomeSreen}
    />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: "#e91e63",
      itemStyle: { backgroundColor: "transparent" },
      labelStyle: { color: "#000000" },
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ route }) => ({
      drawerIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Profile") {
          return (
            <AntDesign
              name="user"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Favourites") {
          return (
            <Entypo
              name="heart"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Home") {
          return (
            <AntDesign
              name="home"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Stempelkarte") {
          return (
            <MaterialCommunityIcons
              name="stamper"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Rate Us") {
          return (
            <MaterialCommunityIcons
              name="star"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Share") {
          return (
            <MaterialCommunityIcons
              name="share-variant"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "News") {
          return (
            <Entypo
              name="news"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Create Resturant") {
          return (
            <MaterialCommunityIcons
              name="chef-hat"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        } else if (route.name === "Terms & Conditions") {
          return (
            <Ionicons
              name="ios-paper"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        }
      },
    })}
  >
    <Drawer.Screen
      name="Home"
      options={{ title: "Restaurants" }}
      component={TabsScreen}
    />
    {/* <Drawer.Screen name="News" component={News} /> */}
    <Drawer.Screen
      options={{ title: "Create Restaurant" }}
      name="Create Resturant"
      component={CreateResturant}
    />
    <Drawer.Screen name="Stempelkarte" component={Stamp} />
    <Drawer.Screen name="Terms & Conditions" component={PrivacyPolicy} />
  </Drawer.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Auth"
      component={LoginAuth}
      options={{
        animationEnabled: false,
      }}
    />

    <RootStack.Screen
      name="App"
      component={DrawerScreen}
      options={{
        animationEnabled: false,
      }}
    />
  </RootStack.Navigator>
);
export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("./assets/splash.gif")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    return (
      <StoreProvider store={store}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </StoreProvider>
    );
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require("./assets/splash.gif");
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();
    const images = [
      require("./src/assets/1.jpg"),
      require("./src/assets/2.jpg"),
      require("./src/assets/3.jpg"),
      require("./src/assets/4.jpg"),
      require("./src/assets/google.png"),
      require("./src/assets/loginWith.png"),
      require("./src/assets/message.png"),
      require("./src/assets/new.png"),
      require("./src/assets/phone.png"),
      require("./src/assets/pin.png"),
      require("./src/assets/profile.png"),
      require("./src/assets/restu.png"),
      require("./src/assets/stemp.png"),
      require("./src/assets/upper.png"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isReady: true });
  };
}
