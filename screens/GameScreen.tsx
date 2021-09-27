import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import Number from "../components/Number";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min) + min);
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randNum;
};

const listItem = (item: number, index: number) => (
  <View key={item} style={styles.listItem}>
    <View>
      <Text>#{index.toString()}</Text>
    </View>
    <View>
      <Text>{item.toString()}</Text>
    </View>
  </View>
);

function GameScreen(props: any) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setcurrentGuess] = useState(initialGuess);

  const [rounds, setRounds] = useState([initialGuess] as number[]);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(rounds.length);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const currLow = useRef(1);

  const currHigh = useRef(100);

  const [deviceWidth, setdeviceWidth] = useState(
    Dimensions.get("window").width
  );

  const [deviceHeight, setdeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setdeviceHeight(Dimensions.get("window").height);
      setdeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don 't Lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "LOWER") {
      currHigh.current = currentGuess;
    } else {
      currLow.current = currentGuess + 1;
    }
    const nextNum = generateRandomBetween(
      currLow.current,
      currHigh.current,
      currentGuess
    );
    setcurrentGuess(nextNum);
    // setRounds((curr) => curr + 1);
    setRounds((curr) => [nextNum, ...curr]);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("LOWER")}>
            <Ionicons name="md-remove" color="white" />
          </MainButton>
          <Number>{currentGuess}</Number>
          <MainButton onPress={() => nextGuessHandler("GREATER")}>
            <Ionicons name="md-add" color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {rounds.map((round, index) =>
              listItem(round, rounds.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <Number>{currentGuess}</Number>
        <Card styles={styles.buttonContainer}>
          <MainButton onPress={() => nextGuessHandler("LOWER")}>
            <Ionicons name="md-remove" color="white" />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler("GREATER")}>
            <Ionicons name="md-add" color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {rounds.map((round, index) =>
              listItem(round, rounds.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 200,
    maxHeight: "90%",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "70%",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "80%" : "90%",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
  },
});

export default GameScreen;
