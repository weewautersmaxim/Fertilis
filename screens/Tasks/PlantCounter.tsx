import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import Logo from "../../Components/Logo";
import { Timer } from "../../styles/components/Timer";

const PlantCounter = ({ navigation }: any) => {
  //usestates
  const [animation, setanimation] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(42669);
  const [timerOn, setTimerOn] = useState(false);
  const [buttonName, SetButtonName] = useState("Start");

  //useffects
  // Runs when timerOn value changes to start or stop timer

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        SetButtonName("Stop");
        setSecondsLeft((secs) => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      } else {
        SetButtonName("Start");
      }
    }, 1000);
    console.log(secondsLeft);
    return () => clearInterval(interval);
  }, [timerOn]);

  //methods
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      {/* header */}
      <View style={header.headercontainer}>
        <TouchableOpacity
          style={{
            width: "33%",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("TaskPage")}
        >
          <View style={header.imageContainer}>
            <Image
              style={header.backImage}
              source={require("../../assets/Back.png")}
            />
          </View>
          <Text style={header.backButton}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            width: "33%",
            alignItems: "center",
          }}
        >
          <Logo />
        </View>

        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            width: "33%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            console.log("add");
          }}
        ></TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={Timer.titel}>Homework</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ alignItems: "center", backgroundColor: "red", width: "85%" }}
        >
          {/* lottie file */}
          <LottieView
            style={{ width: "100%", position: "absolute" }}
            source={require("../../assets/Lottie/Breathing.json")}
            autoPlay={animation}
          ></LottieView>
          <View
            style={{
              width: 200,
              height: 200,
              marginTop: 65,
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/plantTimer.png")}
            ></Image>
          </View>
        </View>
      </View>
      {/* timer */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>
          {clockify().displayHours}:{clockify().displayMins}:{""}
          {clockify().displaySecs}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setanimation(true);
          setTimerOn((timerOn) => !timerOn);
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#68D2AE",
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 25, padding: 5 }}>
            {buttonName}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PlantCounter;
