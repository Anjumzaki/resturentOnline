import "react-native-gesture-handler";
import * as React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPass from "./src/screens/ForgotPass";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Stamp from "./src/screens/Stamp";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { AntDesign } from "@expo/vector-icons";
const Stack = createStackNavigator();

function LoginAuth() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />

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
      <HomeRoutes.Screen name="Home" component={Home} />
      <HomeRoutes.Screen name="Profile" component={Profile} />
      <HomeRoutes.Screen  name="Stempelkarte" component={Stamp} />
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
    <Tabs.Screen name="Home" component={HomeSreen} />
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
        } else if (route.name === "Share") {
          return (
            <Entypo
              name="Home"
              size={26}
              color={focused ? "#707070" : "#707070"}
            />
          );
        }
      },
    })}
  >
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Stempelkarte" component={Stamp} />
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
export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
