import { StyleSheet, Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const conStyles = StyleSheet.create({
  safeAreaMy: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -getStatusBarHeight(),
  },
  imageTop: {
    position: "absolute",
    top: 0,
  },

  scroll: {
    justifyContent: "space-evenly",
    flexGrow: 1,
    minHeight: Dimensions.get("window").height / 2,
  },
});
const cardStyles = StyleSheet.create({
  storeCard: {
    borderRadius: 10,
    shadowColor: "#000",
    justifyContent: "center",
    backgroundColor: "white",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cImgWrap: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  cTextWrap: {
    padding: 10,
  },
});
const headerStyles = StyleSheet.create({
  storeStyles: {
    minHeight: 100,
    // paddingTop:getStatusBarHeight(true),
    backgroundColor: "#2E2E2E",
  },
  cartTxt: {
    position: "absolute",
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 100,
    elevation: 5,
    backgroundColor: "#7AB87F",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
});
const textStyles = StyleSheet.create({
  bolding: {
    color: "#000000",
    fontSize: 20,
  },
});
const textIn = StyleSheet.create({
  label: {
    paddingTop: 20,
  },
  Flabel: {
    paddingTop: 50,
  },
  input: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    paddingTop: 5,
    fontSize: 17,
    paddingBottom: 5,
  },
});
const btnStyles = StyleSheet.create({
  basic: {
    backgroundColor: "#5072B1",
    borderRadius: 15,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  cartBtn: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  cartBtn1: {
    backgroundColor: "#808080",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  plusBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cartBtnOutline: {
    backgroundColor: "white",
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E2E2E",
  },
});
const bottomTab = StyleSheet.create({
  cartSheet: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    elevation: 24,
  },
});
const lines = StyleSheet.create({
  simple: {
    width: "100%",
    marginVertical: 10,
    borderBottomColor: "#EFEFF4",
    borderBottomWidth: 1,
  },
});

const inStyles = StyleSheet.create({
  simple: {
    width: "100%",
    marginVertical: 10,
    borderColor: "#0A2A43",
    borderWidth: 1,
    padding: 5,
    justifyContent: "center",
  },
  innerFeild: {
    paddingRight: 20,
    padding: 6,
    width: "100%",
  },
  upperText: {
    position: "absolute",
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  simplePro: {
    width: "100%",
    marginVertical: 20,
    justifyContent:'space-evenly',
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    width: 40,
    height: 40,
  },
  innerFeildPro: {
    paddingRight: 20,
    padding: 10,
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  inputIconPro: {
    position: "absolute",
    right: 20,
  },
  inputIcon: {
    position: "absolute",
    right: 5,
    padding: 5,
  },
});

export {
  conStyles,
  textStyles,
  textIn,
  btnStyles,
  headerStyles,
  cardStyles,
  bottomTab,
  lines,
  inStyles,
};
