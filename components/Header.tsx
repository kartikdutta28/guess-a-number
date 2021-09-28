import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Colors from "../constants/colors";
function Header(props: any) {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 18,
    fontFamily: "Open Sans Bold",
  },
  headerIos: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
});
export default Header;
