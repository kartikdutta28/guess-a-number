import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainButton from "../components/MainButton";
import Number from "../components/Number";
import colors from "../constants/colors";

function GameOverScreen(props: any) {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>Game Over!!</Text>
        <Image
          fadeDuration={10000}
          style={styles.image}
          source={require("../assets/success.png")}
          resizeMode="cover"
        />
        <View style={styles.resultContainer}>
          <Text style={styles.text}>
            Your Phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>
        <Text style={styles.text}>Number was</Text>
        <Number style={styles.text}>{props.userNumber}</Number>
        <MainButton onPress={props.newGame}>{"New Game"}</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Open Sans Bold",
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  title: {
    fontFamily: "Open Sans Bold",
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 2,
    borderColor: "black",
    marginVertical: Dimensions.get("window").height / 30,
  },
  highlight: {
    color: colors.primary,
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: Dimensions.get("window").height / 60,
  },
});

export default GameOverScreen;
