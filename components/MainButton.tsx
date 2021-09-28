import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
} from "react-native";
import colors from "../constants/colors";

function MainButton(props: any) {
  let ButtonWrapper: any = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonWrapper = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonWrapper onPress={props.onPress} activeOpacity={0.6}>
        <View style={styles.button}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontFamily: "Open Sans",
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
});
export default MainButton;
