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
import {
  customFormValidationStyle,
  getStylesAdd,
} from "../../Components/General/CustomStyle";
import Logo from "../../Components/Logo";
import Task from "../../models/Task";
import { background, colors } from "../../styles/colors/Theme";
import { Add } from "../../styles/components/AddPage/Add";
import { basicStyle } from "../../styles/components/general/BasicStyles";
import { header } from "../../styles/components/general/StackHeader";
import { initTasks, taskCRUD } from "../../utils/Db";

const AddPage = ({ navigation }: any) => {
  //useStates
  const [sliderValue, setSliderValue] = useState(240);
  const [newTask, setNewTask] = useState<Task>({
    activity: "",
    timer: 240,
    plant: "Ivy",
    plantTimer: 600,
    unfinished: "false",
  });
  const [customFormValidation, SetCustomFormValidation] = useState("none");
  const [customFormBorder, SetCustomFormBorder] = useState(colors.white);

  //special usestates for every plant for changing opacity for each individual plant (first plant never unavailable)
  const [opacityValue2, SetOpacityValue2] = useState(1);
  const [OpacityValuePlant3, SetOpacityValuePlant3] = useState(1);
  const [OpacityValuePlant4, SetOpacityValuePlant4] = useState(1);

  //disable chosen plant
  const [disabled, SetDisabled] = useState(false);
  const [disabledPlant3, SetDisabledPlant3] = useState(false);
  const [disabledPlant4, SetDisabledPlant4] = useState(false);

  //useEffects
  useEffect(() => {
    initTasks();
  }, []);

  useEffect(() => {
    OpacityHandler();
  }, [sliderValue]);

  const saveTask = async () => {
    if (newTask.activity) {
      const insert = await taskCRUD.create(newTask);
      if (insert.rowsAffected > 0) {
        navigation.navigate("TaskPage");
      }
    } else {
      SetCustomFormValidation("flex");
      SetCustomFormBorder(colors.red);
      console.log("not saved");
    }
  };

  const styles = getStylesAdd(
    opacityValue2,
    OpacityValuePlant3,
    OpacityValuePlant4
  );

  const formStyle = customFormValidationStyle(
    customFormValidation,
    customFormBorder
  );

  const OpacityHandler = () => {
    //could use switch case but 'if else' is apperantly better for performance
    if (sliderValue <= 20) {
      SetOpacityValue2(0.4);
      SetDisabled(!disabled);
    } else {
      SetOpacityValue2(1);
      SetDisabled(disabled);
    }
    if (sliderValue <= 50) {
      SetOpacityValuePlant3(0.4);
      SetDisabledPlant3(!disabled);
    } else {
      SetOpacityValuePlant3(1);
      SetDisabledPlant3(disabled);
    }
    if (sliderValue <= 80) {
      SetOpacityValuePlant4(0.4);
      SetDisabledPlant4(!disabled);
    } else {
      SetOpacityValuePlant4(1);
      SetDisabledPlant4(disabled);
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
        {/* add button possible, not necessary on this page */}
        <View style={{ width: "33%" }}></View>
      </View>
      {/* end header */}
      <View style={Add.section}>
        <View style={{ width: "100%" }}>
          <View style={Add.section}>
            <Text style={Add.title}>Activity:</Text>
          </View>
          <View style={Add.section}>
            <TextInput
              maxLength={150}
              placeholder="Write your task..."
              style={[Add.input, formStyle.border]}
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
            <Text style={formStyle.message}>Activity required</Text>
          </View>

          <View style={Add.section}>
            <View style={Add.autoWidth}>
              <Text style={Add.title}>Timer:</Text>
            </View>
          </View>
          <View style={Add.section}>
            <Slider
              style={{ width: "90%" }}
              //Change minimum value in case you want to test with lower value
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
          <View style={Add.section}>
            <View
              style={[
                Add.autoWidth,
                {
                  paddingBottom: 10,
                },
              ]}
            >
              <Text
                style={[
                  Add.title,
                  {
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                  },
                ]}
              >
                Plant:
              </Text>
            </View>
          </View>
          <View style={Add.section}>
            <View
              style={[
                Add.autoWidth,
                {
                  justifyContent: "space-between",
                  flexDirection: "row",
                },
              ]}
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setNewTask((oldTask: Task) => {
                      oldTask.plant = "Ivy";
                      //Change number in case you want to test with lower value
                      oldTask.plantTimer = 10 * 60;
                      return { ...oldTask };
                    });
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white" }}>Ivy</Text>
                  </View>
                  <View style={Add.imageContainer}>
                    <Image
                      style={Add.image}
                      source={require("../../assets/Plants/plantIcons/Plant1.png")}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={Add.timer}>10:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.opacity}>
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => {
                    setNewTask((oldTask: Task) => {
                      oldTask.plant = "Basil";
                      oldTask.plantTimer = 30 * 60;
                      return { ...oldTask };
                    });
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white" }}>Basil</Text>
                  </View>
                  <View style={Add.imageContainer}>
                    <Image
                      style={Add.image}
                      source={require("../../assets/Plants/plantIcons/Plant2.png")}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={Add.timer}>30:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.opacityPlant3}>
                <TouchableOpacity
                  disabled={disabledPlant3}
                  onPress={() => {
                    setNewTask((oldTask: Task) => {
                      oldTask.plant = "Kunal";
                      oldTask.plantTimer = 60 * 60;
                      return { ...oldTask };
                    });
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white" }}>Kunal</Text>
                  </View>
                  <View style={Add.imageContainer}>
                    <Image
                      style={Add.image}
                      source={require("../../assets/Plants/plantIcons/Plant3.png")}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={Add.timer}>60:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.opacityPlant4}>
                <TouchableOpacity
                  disabled={disabledPlant4}
                  onPress={() => {
                    setNewTask((oldTask: Task) => {
                      oldTask.plant = "Dahlia";
                      oldTask.plantTimer = 90 * 60;
                      return { ...oldTask };
                    });
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white" }}>Dahlia</Text>
                  </View>
                  <View style={Add.imageContainer}>
                    <Image
                      style={Add.image}
                      source={require("../../assets/Plants/plantIcons/Plant4.png")}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={Add.timer}>90:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("test press");
              saveTask();
            }}
            style={[
              basicStyle.center,
              {
                marginTop: 30,
              },
            ]}
          >
            <View
              pointerEvents="none"
              style={[
                basicStyle.center,
                {
                  backgroundColor: "#78C3A9",
                  width: 120,
                  borderRadius: 5,
                },
              ]}
            >
              <Text style={{ color: "white", fontSize: 25, padding: 5 }}>
                Create
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddPage;
