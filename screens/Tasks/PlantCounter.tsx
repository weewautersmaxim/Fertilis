import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import Logo from "../../Components/Logo";
import { Timer } from "../../styles/components/Timer";
import Task from "../../models/Task";
import { taskCRUD } from "../../utils/db";
import Plant from "../../models/Plant";
import { PlantCRUD } from "../../utils/PlantDb";
import { ScrollView } from "react-native-gesture-handler";
import {
  clockify,
  clockifyPlant,
} from "../../Components/PlantCounter/clockify";

const PlantCounter = ({ navigation, route }: any) => {
  //usestates
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [SecondsPlant, setSecondsPlant] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [buttonName, SetButtonName] = useState("Start");
  const [Img, SetImg] = useState(
    require("../../assets/Plants/plantIcons/Plant1.png")
  );
  //SQLiteDatabase
  const [detail, setDetail] = useState<Task>({
    activity: "",
    timer: 5,
    plant: "",
    plantTimer: 0,
    unfinished: "",
  });
  const [detailPlant, SetDetailPlant] = useState<Plant>({
    activity: "test",
    plant: "Ivy",
    plantTimer: 600,
    datePlant: "",
  });

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    adjustingTimer();
  }, []);

  useEffect(() => {
    adjustingTimer();
  }, [detail]);

  useEffect(() => {
    GetRightImage();
  });

  useEffect(() => {
    //extra ding
    let today = new Date().toLocaleDateString();

    SetDetailPlant((oldNote: Plant) => {
      oldNote.plant = detail.plant;
      oldNote.activity = detail.activity;
      oldNote.datePlant = today;
      return { ...oldNote };
    });

    SetDetailPlant((oldNote: Plant) => {
      if (oldNote.plant == "Ivy") {
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 600;
          return { ...oldNote };
        });
      } else if (detail.plant == "Basil") {
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 1800;
          return { ...oldNote };
        });
      } else if (detail.plant == "Kunal") {
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 3600;
          return { ...oldNote };
        });
      } else {
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 5400;
          return { ...oldNote };
        });
      }
      return { ...oldNote };
    });
  }, [detail]);

  //useffects
  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        SetButtonName("Stop");
        setSecondsLeft((secs) => {
          if (secs > 0) return secs - 1;
          else {
            //if timer hits 0, force update 0
            setDetail((oldNote: Task) => {
              oldNote.timer = 0;
              oldNote.plantTimer = 0;
              return { ...oldNote };
            });
            return 0;
          }
        });
      } else SetButtonName("Start");
    }, 1000);

    setDetail((oldNote: Task) => {
      oldNote.timer = parseFloat((secondsLeft / 60).toFixed(2));
      return { ...oldNote };
    });
    if (detail.timer == 0) {
      savePlant();
      saveTask();
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  // timer plant
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setSecondsPlant((secs) => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      }
    }, 1000);
    setDetail((oldNote: Task) => {
      oldNote.plantTimer = SecondsPlant;
      return { ...oldNote };
    });
    return () => clearInterval(interval);
  }, [timerOn]);

  const getDetail = async () => {
    const res = await taskCRUD.read.detail(+route.params.id);
    const dbTask = (res as any).rows._array[0];
    setDetail(dbTask);
  };

  const saveTask = async () => {
    if (detail?.activity && detail.id) {
      await taskCRUD.update(detail);

      navigation.navigate("TaskPage");
    }
  };
  //second database for saving data
  const savePlant = async () => {
    if (detailPlant.activity && detailPlant.plant && detailPlant.plantTimer) {
      if (detail.plantTimer == 0) {
        await PlantCRUD.create(detailPlant);
      }
    } else {
      console.log("plant not saved");
    }
  };

  const GetRightImage = () => {
    //if ivy
    if (detail.plant == "Ivy") {
      if (SecondsPlant > 300) {
        SetImg(require("../../assets/Plants/plant1_A.png"));
      } else if (SecondsPlant >= 100) {
        SetImg(require("../../assets/Plants/plant1_B.png"));
      } else if (SecondsPlant > 0) {
        SetImg(require("../../assets/Plants/plant1_C.png"));
      } else {
        SetImg(require("../../assets/Plants/plant1_D.png"));
      }
    }
    //if basil
    else if (detail.plant == "Basil") {
      if (SecondsPlant > 900) {
        SetImg(require("../../assets/Plants/plant2_A.png"));
      } else if (SecondsPlant >= 150) {
        SetImg(require("../../assets/Plants/plant2_B.png"));
      } else if (SecondsPlant > 0) {
        SetImg(require("../../assets/Plants/plant2_C.png"));
      } else {
        SetImg(require("../../assets/Plants/plant2_D.png"));
      }
    }
    //if kunal
    else if (detail.plant == "Kunal") {
      if (SecondsPlant > 1800) {
        SetImg(require("../../assets/Plants/plant3_A.png"));
      } else if (SecondsPlant >= 200) {
        SetImg(require("../../assets/Plants/plant3_B.png"));
      } else if (SecondsPlant > 0) {
        SetImg(require("../../assets/Plants/plant3_C.png"));
      } else {
        SetImg(require("../../assets/Plants/plant3_D.png"));
      }
    }
    //if Dahlia
    else {
      if (SecondsPlant > 2700) {
        SetImg(require("../../assets/Plants/plant4_A.png"));
      } else if (SecondsPlant >= 300) {
        SetImg(require("../../assets/Plants/plant4_B.png"));
      } else if (SecondsPlant > 0) {
        SetImg(require("../../assets/Plants/plant4_C.png"));
      } else {
        SetImg(require("../../assets/Plants/plant4_D.png"));
      }
    }
  };

  const adjustingTimer = () => {
    if (detail.timer) {
      let time = detail.timer * 60;
      setSecondsLeft(time);
    }
    if (detail.plantTimer) {
      let planttime = detail.plantTimer;
      setSecondsPlant(planttime);
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
          onPress={() => {
            savePlant();
            saveTask();
          }}
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
        ></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              width: "80%",
            }}
          >
            <Text style={Timer.titel}>{detail?.activity}</Text>
            <Text>
              {clockifyPlant(SecondsPlant).displayHours}:
              {clockifyPlant(SecondsPlant).displayMins}:{""}
              {clockifyPlant(SecondsPlant).displaySecs}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "red",
              width: "85%",
            }}
          >
            {/* lottie file */}
            <LottieView
              style={{ width: "100%", position: "absolute" }}
              source={require("../../assets/Lottie/Breathing.json")}
              autoPlay={true}
            ></LottieView>
            <View
              style={{
                width: 200,
                height: 200,
                marginTop: 68,
              }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={Img}
              ></Image>
            </View>
          </View>
        </View>
        {/* timer */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Text style={{ color: "white", fontSize: 28 }}>
            {clockify(secondsLeft).displayHours}:
            {clockify(secondsLeft).displayMins}:{""}
            {clockify(secondsLeft).displaySecs}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setTimerOn((timerOn) => !timerOn);
            setDetail((oldNote: Task) => {
              oldNote.unfinished = "true";
              return { ...oldNote };
            });
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
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
              {buttonName}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PlantCounter;
