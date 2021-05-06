import React, { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { header } from "../../styles/components/general/StackHeader";
import Logo from "../../Components/General/Logo";
import { Timer } from "../../styles/components/PlantCounterPage/Timer";
import Task from "../../models/Task";
import { taskCRUD } from "../../utils/Db";
import Plant from "../../models/Plant";
import { PlantCRUD } from "../../utils/PlantDb";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import {
  clockify,
  clockifyPlant,
} from "../../Components/PlantCounterPage/clockify";
import {
  activate,
  deactivate,
} from "../../Components/PlantCounterPage/keep-awake_Expo";
import { background } from "../../styles/colors/Theme";
import { basicStyle } from "../../styles/components/general/BasicStyles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PlantCounter = ({ navigation, route }: any) => {
  //usestates
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [secondsPlant, setSecondsPlant] = useState(5);
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
    adjustingTimer();
  }, []);

  useEffect(() => {
    adjustingTimer();
    setDate();
  }, [detail]);

  useEffect(() => {
    getRightImage();
  });

  //useffects
  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    let timerFix = false;
    const interval = setInterval(async () => {
      if (timerOn) {
        activate();
        SetButtonName("Stop");
        setSecondsLeft((secs) => {
          if (secs > 0) return secs - 1;
          else {
            clearInterval(interval);
            if (timerFix == false) {
              timerFix = true;
            } else {
              schedulePushNotification();
            }
            setDetail((oldNote: Task) => {
              oldNote.timer = 0;
              oldNote.plantTimer = 0;
              return { ...oldNote };
            });
            return 0;
          }
        });
        setSecondsPlant((plantsecs) => {
          if (plantsecs > 0) return plantsecs - 1;
          else {
            return 0;
          }
        });
      } else {
        deactivate();
        SetButtonName("Start");
        clearInterval(interval);
      }
    }, 1000);

    setDetail((oldNote: Task) => {
      oldNote.timer = parseFloat((secondsLeft / 60).toFixed(2));
      oldNote.plantTimer = secondsPlant;

      return { ...oldNote };
    });

    if (detail.timer == 0) {
      savePlant();
      saveTask();
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  //notifications
  function schedulePushNotification() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "timer completed",
        body: "You have succesfully completed the timer!",
      },
      trigger: { seconds: 1 },
    });
  }

  const setDate = () => {
    let today = new Date().toLocaleDateString();

    SetDetailPlant((oldNote: Plant) => {
      oldNote.plant = detail.plant;
      oldNote.activity = detail.activity;
      oldNote.datePlant = today;
      return { ...oldNote };
    });
    switch (detail.plant) {
      case "Basil":
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 1800;
          return { ...oldNote };
        });
        break;
      case "Kunal":
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 3600;
          return { ...oldNote };
        });
        break;
      case "Dahlia":
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 5400;
          return { ...oldNote };
        });
        break;
      default:
        SetDetailPlant((oldNote: Plant) => {
          oldNote.plantTimer = 600;
          return { ...oldNote };
        });
        break;
    }
  };

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

  const getRightImage = () => {
    switch (detail.plant) {
      case "Ivy":
        if (secondsPlant > 300) {
          SetImg(require("../../assets/Plants/plant1_A.png"));
        } else if (secondsPlant >= 100) {
          SetImg(require("../../assets/Plants/plant1_B.png"));
        } else if (secondsPlant > 0) {
          SetImg(require("../../assets/Plants/plant1_C.png"));
        } else {
          SetImg(require("../../assets/Plants/plant1_D.png"));
        }
        break;
      case "Basil":
        if (secondsPlant > 900) {
          SetImg(require("../../assets/Plants/plant2_A.png"));
        } else if (secondsPlant >= 150) {
          SetImg(require("../../assets/Plants/plant2_B.png"));
        } else if (secondsPlant > 0) {
          SetImg(require("../../assets/Plants/plant2_C.png"));
        } else {
          SetImg(require("../../assets/Plants/plant2_D.png"));
        }
        break;
      case "Kunal":
        if (secondsPlant > 1800) {
          SetImg(require("../../assets/Plants/plant3_A.png"));
        } else if (secondsPlant >= 200) {
          SetImg(require("../../assets/Plants/plant3_B.png"));
        } else if (secondsPlant > 0) {
          SetImg(require("../../assets/Plants/plant3_C.png"));
        } else {
          SetImg(require("../../assets/Plants/plant3_D.png"));
        }
        break;
      default:
        if (secondsPlant > 2700) {
          SetImg(require("../../assets/Plants/plant4_A.png"));
        } else if (secondsPlant >= 300) {
          SetImg(require("../../assets/Plants/plant4_B.png"));
        } else if (secondsPlant > 0) {
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
      // let planttime = 2;
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

        <View
          style={{
            width: "33%",
          }}
        ></View>
      </View>
      {/* end header */}

      <View style={basicStyle.center}>
        <View
          style={[
            basicStyle.center,
            {
              marginTop: 10,
              width: "80%",
            },
          ]}
        >
          <Text style={Timer.titel}>{detail?.activity}</Text>
          <Text>
            {/* timer voor plant, test purpose */}
            {/* {clockifyPlant(secondsPlant).displayHours}:
            {clockifyPlant(secondsPlant).displayMins}:{""}
            {clockifyPlant(secondsPlant).displaySecs} */}
          </Text>
        </View>
      </View>

      <View style={[basicStyle.center, { height: "55%" }]}>
        <View
          style={{
            alignItems: "center",
            width: "82%",
            height: "100%",
            justifyContent: "center",
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
              width: 180,
              height: 180,
            }}
          >
            <Image style={basicStyle.basicImage} source={Img}></Image>
          </View>
        </View>
      </View>

      {/* timer */}
      <View style={[basicStyle.center, { marginTop: 10 }]}>
        <Text style={{ color: "white", fontSize: 28 }}>
          {clockify(secondsLeft).displayHours}:
          {clockify(secondsLeft).displayMins}:{""}
          {clockify(secondsLeft).displaySecs}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          basicStyle.center,
          {
            marginTop: 10,
            height: 50,
          },
        ]}
        onPress={async () => {
          setTimerOn((timerOn) => !timerOn);
          setDetail((oldNote: Task) => {
            oldNote.unfinished = "true";
            return { ...oldNote };
          });
          // await schedulePushNotification();
        }}
      >
        <View
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
            {buttonName}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PlantCounter;
