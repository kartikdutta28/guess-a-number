import React from "react";
import { StyleSheet, View } from "react-native";

function Card(props: any) {
  return (
    <View style={{ ...styles.card, ...props.styles }}>{props.children}</View>
  );
}
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 14,
    padding: 20,
    borderRadius: 10,
  },
});
export default Card;
