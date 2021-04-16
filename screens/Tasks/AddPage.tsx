import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Slider,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { initTasks, taskCRUD } from "../../utils/db";

const AddPage = ({ navigation }: any) => {
  useEffect(() => {
    initTasks();
  }, []);

  const [newTask, setNewTask] = useState<Task>({
    activity: "test",
    timer: 150,
    plant: "violet",
  });

  const [sliderValue, setSliderValue] = useState(10);

  const saveTask = async () => {
    if (newTask.activity && newTask.timer && newTask.plant) {
      const insert = await taskCRUD.create(newTask);
      console.log({ insert });
      if (insert.rowsAffected > 0) {
        navigation.navigate("TaskPage");
      }
    } else {
      console.log("not saved");
    }
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
      {/* end header */}

      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            }}
          >
            Activity:
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          placeholder="write your task!"
          style={{
            backgroundColor: "white",
            width: "85%",
            height: 50,
            paddingLeft: 10,
            borderRadius: 5,
          }}
          multiline={true}
          returnKeyType="done"
          onChangeText={(text: string) => {
            setNewTask((oldTask: Task) => {
              oldTask.activity = text;
              return { ...oldTask };
            });
          }}
          value={newTask?.activity}
        ></TextInput>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            }}
          >
            Timer:
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Slider
          style={{ width: "90%" }}
          minimumValue={10}
          maximumValue={240}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#1A9375"
          step={10}
          // onValueChange={(value) => setSliderValue(value)}
          onValueChange={(text: number) => {
            setNewTask((oldTask: Task) => {
              oldTask.timer = text;
              return { ...oldTask };
            });
          }}
          value={newTask?.timer}
        />
        <Text style={{ color: "white", fontSize: 25 }}>
          {sliderValue} minutes
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            }}
          >
            Plant:
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setNewTask((oldTask: Task) => {
                oldTask.plant = "bloem";
                return { ...oldTask };
              });
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>30:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          saveTask();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
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
            Create
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default AddPage;
