import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background } from "../../styles/colors/theme";
import { SQLResultSetRowList } from "expo-sqlite";
import { header } from "../../styles/components/header";
import { Tasks } from "../../styles/components/Tasks";
import { taskCRUD } from "../../utils/db";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TaskPage = ({ navigation }: any) => {
  //usestates
  const [TaskState, SetTaskState] = useState<Task[]>([]);
  const [unfinishedTasks, SetunfinishedTasks] = useState<Task[]>([]);
  const [newTasks, SetNewTasks] = useState<Task[]>([]);

  //
  const [customOpacity, SetCustomOpacity] = useState(1);
  const [customHeight, SetCustomHeight] = useState(27);
  const [customBorder, SetCustomBorder] = useState(2);
  const [customMargin, SetCustomMargin] = useState(10);

  const [taskImage, SetTaskImage] = useState(
    require("../../assets/Plants/plantIcons/Plant2.png")
  );

  useEffect(() => {
    TimerDone();
  }, [TaskState]);

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, [])
  );

  //methods
  const getTasks = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await taskCRUD.read.all();
    const unfinishedRows = await taskCRUD.read.unfinished();
    const unifinishedTask = (unfinishedRows as any).rows._array;

    const newRows = await taskCRUD.read.new();
    const newTasks = (newRows as any).rows._array;

    await SetTaskState((rows as any)._array);

    SetunfinishedTasks(unifinishedTask);
    if (unifinishedTask.length == 0) {
      SetCustomOpacity(0);
      SetCustomHeight(0);
      SetCustomBorder(0);
      SetCustomMargin(0);
    } else {
      SetCustomOpacity(1);
      SetCustomHeight(27);
      SetCustomBorder(2);
      SetCustomMargin(10);
    }
    SetNewTasks(newTasks);
  };

  //method for removing "unfinished tab" when empty
  const getStyles = (
    opacityValue: any,
    customHeight: any,
    customBorder: any,
    customMargin: any
  ) =>
    StyleSheet.create({
      customSection: {
        opacity: opacityValue,
        height: customHeight,
        width: "100%",
        borderBottomColor: "white",
        borderBottomWidth: customBorder,
        marginTop: customMargin,
      },
    });
  const styles = getStyles(
    customOpacity,
    customHeight,
    customBorder,
    customMargin
  );

  const removeTasks = async (id: number) => {
    await taskCRUD.delete(id);
    getTasks();
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

  const TimerDone = () => {
    for (let i = 0; i < TaskState.length; i++) {
      if (TaskState[i].timer == 0) {
        removeTasks(parseInt(TaskState[i].id!));
      }
    }
  };

  const leftSwipe = () => {
    return (
      <View
        style={{
          backgroundColor: "#1A9375",
          marginTop: 10,
          flexDirection: "row",
          width: "100%",
          borderRadius: 10,
          padding: 6,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 15, marginLeft: 10 }}>
          Delete
        </Text>
      </View>
    );
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

  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      {/* header */}
      <View style={header.headercontainer}>
        <TouchableOpacity
          style={{
            width: "33%",
            flexDirection: "row",
          }}
          onPress={() => {
            console.log("back");
          }}
        ></TouchableOpacity>
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
            navigation.navigate("AddPage");
          }}
        >
          <Text style={header.addButton}>Add</Text>
          <View
            style={{ width: 45, height: 45, marginLeft: 10, marginRight: 20 }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/Add.png")}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* unfinished section */}
      <ScrollView>
        <View style={Tasks.base}>
          <View style={styles.customSection}>
            <Text style={{ color: "white", fontSize: 18 }}>Unfinished:</Text>
          </View>
          {/* end unfinished section */}
          <ScrollView>
            {/* here start tasks */}
            {unfinishedTasks.map((n: Task) => (
              <Swipeable
                key={n.id}
                renderLeftActions={leftSwipe}
                onSwipeableLeftOpen={() => {
                  if (n.id) removeTasks(+n.id);
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlantCounter", { id: n.id })
                  }
                  style={Tasks.task}
                  key={n.id}
                >
                  <View style={{ width: 65, height: 65 }}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text
                    style={{ fontSize: 23, color: "#707070", width: "40%" }}
                  >
                    {n.activity}
                  </Text>
                  <Text
                    style={{ fontSize: 23, color: "#707070", marginRight: 20 }}
                  >
                    {clock(n.timer)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            ))}
            {/* end tasks */}
          </ScrollView>
          {/* end tasks */}
        </View>
        {/* tasks section */}
        <View style={Tasks.base}>
          <View style={Tasks.taskSection}>
            <Text style={{ color: "white", fontSize: 18 }}>New:</Text>
          </View>
          <ScrollView>
            {/* here start tasks */}
            {newTasks.map((n: Task) => (
              <Swipeable
                key={n.id}
                renderLeftActions={leftSwipe}
                onSwipeableLeftOpen={() => {
                  if (n.id) removeTasks(+n.id);
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlantCounter", { id: n.id })
                  }
                  style={Tasks.task}
                  key={n.id}
                >
                  <View style={{ width: 65, height: 65 }}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text
                    style={{
                      fontSize: 23,
                      color: "#707070",
                      width: "40%",
                    }}
                  >
                    {n.activity}
                  </Text>
                  <Text
                    style={{ fontSize: 23, color: "#707070", marginRight: 20 }}
                  >
                    {clock(n.timer)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            ))}
            {/* end tasks */}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TaskPage;
