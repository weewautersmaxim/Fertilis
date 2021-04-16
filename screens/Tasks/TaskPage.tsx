import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background } from "../../styles/colors/theme";
import { SQLResultSetRowList } from "expo-sqlite";
import { header } from "../../styles/components/header";
import { Tasks } from "../../styles/components/Tasks";
import { taskCRUD } from "../../utils/db";
import { useFocusEffect } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TaskPage = ({ navigation }: any) => {
  //usestates
  const [TaskState, SetTaskState] = useState<Task[]>([]);

  //useEffects
  useEffect(() => {
    getTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, [])
  );
  useEffect(() => {
    console.log("found tasks", { TaskState });
  });

  //functions
  const getTasks = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await taskCRUD.read.all();
    console.log({ rows });
    SetTaskState((rows as any)._array);
  };
  const removeTasks = async (id: number) => {
    const res = await taskCRUD.delete(id);
    console.log({ res });
    getTasks();
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
          <TouchableOpacity
            onPress={() => navigation.navigate("PlantCounter")}
            style={Tasks.task}
          >
            <View style={{ width: 65, height: 65 }}>
              <Image
                style={Tasks.taskImage}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <Text style={{ fontSize: 25, color: "#707070" }}>Homework</Text>
            <Text style={{ fontSize: 25, color: "#707070", marginRight: 20 }}>
              60:00
            </Text>
          </TouchableOpacity>
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
                onPress={() => navigation.navigate("PlantCounter")}
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
                  {n.timer + ":00"}
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
