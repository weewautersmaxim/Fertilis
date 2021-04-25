import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Slider,
  SafeAreaViewBase,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Plant from "../../models/Plant";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { Tasks } from "../../styles/components/Tasks";
import { SQLResultSetRowList } from "expo-sqlite";
import { PlantCRUD } from "../../utils/PlantDb";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Timeline = ({ navigation }: any) => {
  //usestates
  const [timelineState, SetTimelineState] = useState<Plant[]>([]);

  //useEffects

  useEffect(() => {
    getTimeline();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTimeline();
    }, [])
  );

  //methods
  const getTimeline = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await PlantCRUD.read.all();
    SetTimelineState((rows as any)._array.reverse());
  };

  const plant = (plant: any) => {
    switch (plant) {
      case "Ivy":
        return require("../../assets/Plants/plantIcons/Plant1.png");
      case "Basil":
        return require("../../assets/Plants/plantIcons/Plant2.png");
      case "Kunal":
        return require("../../assets/Plants/plantIcons/Plant3.png");
      default:
        return require("../../assets/Plants/plantIcons/Plant4.png");
    }
  };

  const clockify = (timer: any) => {
    if (timer != 0) {
      let time = timer * 60;
      let hours = Math.floor(time / 60 / 60);
      let mins = Math.floor((time / 60) % 60);
      let seconds = Math.floor(time % 60);
      let displayHours = hours < 10 ? `0${hours}` : hours;
      let displayMins = mins < 10 ? `0${mins}` : mins;
      let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
      return {
        displayHours,
        displayMins,
        displaySecs,
      };
    }
  };

  const clock = (timer: any) => {
    let time = "";
    if (timer != 0) {
      time =
        clockify(timer)!.displayHours +
        ":" +
        clockify(timer)!.displayMins +
        ":" +
        clockify(timer)!.displaySecs;
    }
    return time;
  };

  //when starting app, no tasks exist, hide error that he can't find any tasks yet...
  LogBox.ignoreAllLogs();

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
      {/* end header */}
      <ScrollView>
        {timelineState.map((n: Plant) => (
          <View key={n.id}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "85%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginTop: 20,
                    marginBottom: 5,
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                  }}
                >
                  {n.datePlant}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: "85%" }}>
                <View style={Tasks.task}>
                  <View style={{ width: 65, height: 65 }}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text
                    style={{ fontSize: 22, color: "#707070", width: "40%" }}
                  >
                    {n.activity}
                  </Text>
                  <Text
                    style={{ fontSize: 22, color: "#707070", marginRight: 20 }}
                  >
                    {clock(n.plantTimer! / 60)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Timeline;
