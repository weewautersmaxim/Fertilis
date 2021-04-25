import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background } from "../../styles/colors/Theme";
import { SQLResultSetRowList } from "expo-sqlite";
import { header } from "../../styles/components/general/StackHeader";
import { Tasks } from "../../styles/components/TaskPage/Tasks";
import { taskCRUD } from "../../utils/Db";
import { useFocusEffect } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { plant } from "../../Components/TaskPage/GetPlant";
import { leftSwipe } from "../../Components/TaskPage/LeftSwipe";
import { clock } from "../../Components/TaskPage/Clockify";
import { getStylesTasks } from "../../Components/General/CustomStyle";

const TaskPage = ({ navigation }: any) => {
  //useStates
  const [taskState, SetTaskState] = useState<Task[]>([]);
  const [unfinishedTasks, SetUnfinishedTasks] = useState<Task[]>([]);
  const [newTasks, SetNewTasks] = useState<Task[]>([]);

  //useState for changing style when criteria is met
  const [customDisplay, SetCustomDisplay] = useState("none");

  //useEffects
  useEffect(() => {
    timerDone();
  }, [taskState]);

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

    SetUnfinishedTasks(unifinishedTask);
    if (unifinishedTask.length == 0) {
      SetCustomDisplay("none");
    } else {
      SetCustomDisplay("flex");
    }
    SetNewTasks(newTasks);
  };

  const styles = getStylesTasks(customDisplay);

  const removeTasks = async (id: number) => {
    await taskCRUD.delete(id);
    getTasks();
  };

  const timerDone = () => {
    for (let i = 0; i < taskState.length; i++) {
      if (taskState[i].timer == 0) {
        removeTasks(parseInt(taskState[i].id!));
      }
    }
  };

  //When starting app for the first time, no tasks have been created yet. Hide warning that he can't find any tasks...
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
          style={header.addButtonContainer}
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
            <Text style={Tasks.textTitle}>Unfinished:</Text>
          </View>
          <ScrollView>
            {/* here start unfinished tasks */}
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
                  <View style={Tasks.taskImageContainer}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text style={[Tasks.text, { width: "40%" }]}>
                    {n.activity}
                  </Text>
                  <Text style={[Tasks.text, { marginRight: 20 }]}>
                    {clock(n.timer)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            ))}
            {/* end unfinished tasks */}
          </ScrollView>
          {/* end unfinished section */}
        </View>
        {/* new tasks section */}
        <View style={Tasks.base}>
          <View style={Tasks.taskSection}>
            <Text style={Tasks.textTitle}>New:</Text>
          </View>
          <ScrollView>
            {/* here start new tasks */}
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
                  <View style={Tasks.taskImageContainer}>
                    <Image style={Tasks.taskImage} source={plant(n.plant)} />
                  </View>
                  <Text style={[Tasks.text, { width: "40%" }]}>
                    {n.activity}
                  </Text>
                  <Text style={[Tasks.text, { marginRight: 20 }]}>
                    {clock(n.timer)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            ))}
            {/* end new tasks */}
          </ScrollView>
          {/* end tasks section */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TaskPage;
