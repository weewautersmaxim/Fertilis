import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Button,
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
  const [Isfinished, SetIsfinished] = useState(false);
  const [taskImage, SetTaskImage] = useState(
    require("../../assets/Plants/plantIcons/Plant2.png")
  );

  useEffect(() => {
    TaskImage();
  }, [TaskState]);

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
    const unfinishedrows = await taskCRUD.read.unfinished();
    const unifinishedTask = (unfinishedrows as any).rows._array;
    await SetTaskState((rows as any)._array);

    //hier maken we filter aan voor new/unfinished lists
    let Arraynew = (rows as any)._array;
    let ArrayUnfinished = [];

    //filter
    for (let i = 0; i < TaskState.length; i++) {
      if (TaskState[i].unfinished == "true") {
        await ArrayUnfinished.push(TaskState[i]);
        // console.log(Arraynew.pop(TaskState[i]));
      }
    }
    SetunfinishedTasks(unifinishedTask);
  };

  const removeTasks = async (id: number) => {
    const res = await taskCRUD.delete(id);
    getTasks();
  };

  const TaskImage = () => {
    for (let i = 0; i < TaskState.length; i++) {
      console.log("task gevonden");
      if (TaskState[i].plant == "Ivy") {
        SetTaskImage(require("../../assets/Plants/plantIcons/Plant1.png"));
      } else if (TaskState[i].plant == "Basil") {
        SetTaskImage(require("../../assets/Plants/plantIcons/Plant2.png"));
      } else if (TaskState[i].plant == "Kunal") {
        SetTaskImage(require("../../assets/Plants/plantIcons/Plant3.png"));
      } else {
        SetTaskImage(require("../../assets/Plants/plantIcons/Plant4.png"));
      }
    }
  };

  const TimerDone = () => {
    for (let i = 0; i < TaskState.length; i++) {
      if (TaskState[i].timer == 0 && Isfinished == false) {
        SetIsfinished(true);
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

  const clockify = () => {
    for (let i = 0; i < TaskState.length; i++) {
      if (TaskState[i].timer != 0) {
        let timer = TaskState[i].timer! * 60;
        let hours = Math.floor(timer / 60 / 60);
        let mins = Math.floor((timer / 60) % 60);
        let seconds = Math.floor(timer % 60);
        let displayHours = hours < 10 ? `0${hours}` : hours;
        let displayMins = mins < 10 ? `0${mins}` : mins;
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
        return {
          displayHours,
          displayMins,
          displaySecs,
        };
      }
    }
  };

  const test = (): string => {
    let time = "";
    for (let i = 0; i < TaskState.length; i++) {
      if (TaskState[i].timer != 0) {
        time =
          clockify()!.displayHours +
          ":" +
          clockify()!.displayMins +
          ":" +
          clockify()!.displaySecs;
      }
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
      <View style={Tasks.base}>
        <View style={Tasks.taskSection}>
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
                  <Image
                    style={Tasks.taskImage}
                    source={require("../../assets/DeleteLater.png")}
                  />
                </View>
                <Text style={{ fontSize: 25, color: "#707070" }}>
                  {n.activity}
                </Text>
                <Text
                  style={{ fontSize: 25, color: "#707070", marginRight: 20 }}
                >
                  {test()}
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
          {TaskState.map((n: Task) => (
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
                  <Image style={Tasks.taskImage} source={taskImage} />
                </View>
                <Text style={{ fontSize: 25, color: "#707070" }}>
                  {n.activity}
                </Text>
                <Text
                  style={{ fontSize: 25, color: "#707070", marginRight: 20 }}
                >
                  {test()}
                </Text>
              </TouchableOpacity>
            </Swipeable>
          ))}
          {/* end tasks */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TaskPage;
