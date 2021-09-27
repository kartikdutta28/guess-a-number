import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import Number from "../components/Number";
import Colors from "../constants/colors";

function StartGameScreen(props: any) {
  const [value, setvalue] = useState("");

  const [confrimed, setConfrimed] = useState(false);

  const [selectedNumber, setselectedNumber] = useState(0);

  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const updateButtonWidth = () => {
    setButtonWidth(Dimensions.get("window").width / 4);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", updateButtonWidth);

    return () => {
      Dimensions.removeEventListener("change", updateButtonWidth);
    };
  }, []);

  const numberInputHandler = (text: string) => {
    setvalue(text.replace(/[^0-9]/g, ""));
  };
  const confirmInputHandler = () => {
    Keyboard.dismiss();
    const choosenNumber = parseInt(value);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: () => {
              setvalue("");
              setConfrimed(false);
              Keyboard.dismiss();
            },
          },
        ]
      );
      return;
    }
    setConfrimed(true);
    setselectedNumber(choosenNumber);
    setvalue("");
  };

  let confirmedOutput;

  if (confrimed) {
    confirmedOutput = (
      <Card styles={styles.summaryContainer}>
        <Text style={styles.summaryContainerText}>You Selected</Text>
        <Number>{selectedNumber}</Number>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          {"START GAME"}
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card styles={styles.inputContainer}>
              <Text style={styles.inputContainerTitle}>Select a Number</Text>
              <Input
                style={styles.inputStyle}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={value}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={() => {
                      setvalue("");
                      setConfrimed(false);
                    }}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Open Sans Bold",
  },
  inputContainer: {
    width: "80%",
    minWidth: 280,
    maxWidth: "90%",
    alignItems: "center",
  },
  inputContainerTitle: {
    fontFamily: "Open Sans",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputStyle: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  summaryContainerText: {
    fontFamily: "Open Sans",
  },
});
export default StartGameScreen;
