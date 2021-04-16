import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import Logo from "../../Components/Logo";
import { Timer } from "../../styles/components/Timer";
import Slider from "@react-native-community/slider";

const PlantCounter = ({ navigation }: any) => {
  const [sliderValue, setSliderValue] = useState(10);
  const [animation, setanimation] = React.useState(false);

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
          marginTop: 100,
        }}
      >
        <Text style={{ color: "white", fontSize: 25 }}>{sliderValue}</Text>
        <Slider
          style={{ width: "80%" }}
          minimumValue={10}
          maximumValue={240}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#1A9375"
          step={1}
          onValueChange={(value) => setSliderValue(value)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("timer started");
          setanimation(true);
          console.log(animation);
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
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
            Start
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PlantCounter;
