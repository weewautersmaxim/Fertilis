import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Slider,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { initTasks, taskCRUD } from "../../utils/db";

const AddPage = ({ navigation }: any) => {
  const [sliderValue, setSliderValue] = useState(240);
  const [newTask, setNewTask] = useState<Task>({
    activity: "test",
    timer: 240,
    plant: "violet",
    unfinished: "false",
  });
  //special usestates for every plant
  //for changing opacity for each individual plant
  const [opacityValue, setOpacityValue] = useState(1);
  const [OpacityValuePlant3, setOpacityValuePlant3] = useState(1);
  const [OpacityValuePlant4, setOpacityValuePlant4] = useState(1);

  //disable chosen plant
  const [disabled, setDisabled] = useState(false);
  const [disabledPlant3, setDisabledPlant3] = useState(false);
  const [disabledPlant4, setDisabledPlant4] = useState(false);

  useEffect(() => {
    initTasks();
  }, []);

  useEffect(() => {
    OpacityHandler();
  }, [sliderValue]);

  const saveTask = async () => {
    if (newTask.activity && newTask.timer && newTask.plant) {
      const insert = await taskCRUD.create(newTask);
      if (insert.rowsAffected > 0) {
        navigation.navigate("TaskPage");
      }
    } else {
      console.log("not saved");
    }
  };

  const getStyles = (opacityValue: any, OpacityValuePlant3: any) =>
    StyleSheet.create({
      opacity: {
        opacity: opacityValue,
      },
      opacityPlant3: {
        opacity: OpacityValuePlant3,
      },
      opacityPlant4: {
        opacity: OpacityValuePlant4,
      },
    });
  const styles = getStyles(opacityValue, OpacityValuePlant3);

  const OpacityHandler = () => {
    if (sliderValue <= 20) {
      setOpacityValue(0.4);
      setDisabled(!disabled);
    } else {
      setOpacityValue(1);
      setDisabled(disabled);
    }
    if (sliderValue <= 50) {
      setOpacityValuePlant3(0.4);
      setDisabledPlant3(!disabled);
    } else {
      setOpacityValuePlant3(1);
      setDisabledPlant3(disabled);
    }
    if (sliderValue <= 80) {
      setOpacityValuePlant4(0.4);
      setDisabledPlant4(!disabled);
    } else {
      setOpacityValuePlant4(1);
      setDisabledPlant4(disabled);
    }
  };
  console.log("test", newTask);
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
          onValueChange={(text: number) => {
            setNewTask((oldTask: Task) => {
              oldTask.timer = text;
              setSliderValue(text);
              return { ...oldTask };
            });
            OpacityHandler();
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
          <View>
            <TouchableOpacity
              onPress={() => {
                setNewTask((oldTask: Task) => {
                  oldTask.plant = "Ivy";
                  return { ...oldTask };
                });
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white" }}>Ivy</Text>
              </View>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../../assets/Plants/plantIcons/Plant1.png")}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>10:00</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.opacity}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                setNewTask((oldTask: Task) => {
                  oldTask.plant = "Basil";
                  return { ...oldTask };
                });
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white" }}>Basil</Text>
              </View>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../../assets/Plants/plantIcons/Plant2.png")}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>30:00</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.opacityPlant3}>
            <TouchableOpacity
              disabled={disabledPlant3}
              onPress={() => {
                setNewTask((oldTask: Task) => {
                  oldTask.plant = "Kunal";
                  return { ...oldTask };
                });
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white" }}>Kunal</Text>
              </View>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../../assets/Plants/plantIcons/Plant3.png")}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.opacityPlant4}>
            <TouchableOpacity
              disabled={disabledPlant4}
              onPress={() => {
                setNewTask((oldTask: Task) => {
                  oldTask.plant = "Dahlia";
                  return { ...oldTask };
                });
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white" }}>Dahlia</Text>
              </View>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../../assets/Plants/plantIcons/Plant4.png")}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>90:00</Text>
              </View>
            </TouchableOpacity>
          </View>
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
