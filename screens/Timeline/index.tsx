import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Plant from "../../models/Plant";
import { background } from "../../styles/colors/Theme";
import { header } from "../../styles/components/general/StackHeader";
import { Tasks } from "../../styles/components/TaskPage/Tasks";
import { SQLResultSetRowList } from "expo-sqlite";
import { PlantCRUD } from "../../utils/PlantDb";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { clock } from "../../Components/TaskPage/Clockify";
import { basicStyle } from "../../styles/components/general/BasicStyles";
import { timeline } from "../../styles/components/TimelinePage/Timeline";
import { plant } from "../../Components/TaskPage/GetPlant";

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
            <View style={basicStyle.center}>
              <View
                style={{
                  width: "85%",
                }}
              >
                <Text style={timeline.date}>{n.datePlant}</Text>
              </View>
            </View>
            <View style={basicStyle.center}>
              <View style={{ width: "85%" }}>
                <View style={Tasks.task}>
                  <View style={{ width: 65, height: 65 }}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text style={[timeline.font, { width: "40%" }]}>
                    {n.activity}
                  </Text>
                  <Text style={[timeline.font, { marginRight: 20 }]}>
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
