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

const PlantCounter = ({ navigation, route }: any) => {
  //usestates
  const [animation, setanimation] = useState(true);
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
    timer: 0,
    plant: "",
    plantTimer: 0,
    unfinished: "",
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

  //useffects
  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        SetButtonName("Stop");
        setSecondsLeft((secs) => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      } else SetButtonName("Start");
    }, 1000);
    setDetail((oldNote: Task) => {
      oldNote.timer = parseFloat((secondsLeft / 60).toFixed(2));
      return { ...oldNote };
    });
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
      console.log("task wordt geupdate");
      const res = await taskCRUD.update(detail);

      navigation.navigate("TaskPage");
    }
  };

  const GetRightImage = () => {
    //if ivy
    if (detail.plant == "Ivy") {
      if (SecondsPlant > 300) {
        SetImg(require("../../assets/Plants/plant1_A.png"));
      } else if (SecondsPlant >= 100) {
        SetImg(require("../../assets/Plants/plant1_B.png"));
      } else {
        SetImg(require("../../assets/Plants/plant1_C.png"));
      }
    }
    //if basil
    else if (detail.plant == "Basil") {
      if (SecondsPlant > 900) {
        SetImg(require("../../assets/Plants/plant2_A.png"));
      } else if (SecondsPlant >= 150) {
        SetImg(require("../../assets/Plants/plant2_B.png"));
      } else {
        SetImg(require("../../assets/Plants/plant2_C.png"));
      }
    }
    //if kunal
    else if (detail.plant == "Kunal") {
      if (SecondsPlant > 1800) {
        SetImg(require("../../assets/Plants/plant3_A.png"));
      } else if (SecondsPlant >= 200) {
        SetImg(require("../../assets/Plants/plant3_B.png"));
      } else {
        SetImg(require("../../assets/Plants/plant3_C.png"));
      }
    }
    //if Dahlia
    else {
      if (SecondsPlant > 2700) {
        SetImg(require("../../assets/Plants/plant4_A.png"));
      } else if (SecondsPlant >= 300) {
        SetImg(require("../../assets/Plants/plant4_B.png"));
      } else {
        SetImg(require("../../assets/Plants/plant4_C.png"));
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

  //methods
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };
  const clockifyPlant = () => {
    let hours = Math.floor(SecondsPlant / 60 / 60);
    let mins = Math.floor((SecondsPlant / 60) % 60);
    let seconds = Math.floor(SecondsPlant % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
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
            setDetail((oldNote: Task) => {
              oldNote.timer = parseFloat((secondsLeft / 60).toFixed(2));
              return { ...oldNote };
            });
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={Timer.titel}>{detail?.activity}</Text>
        <Text>
          {clockifyPlant().displayHours}:{clockifyPlant().displayMins}:{""}
          {clockifyPlant().displaySecs}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ alignItems: "center", backgroundColor: "red", width: "85%" }}
        >
          {/* lottie file */}
          <LottieView
            style={{ width: "100%", position: "absolute" }}
            source={require("../../assets/Lottie/Breathing.json")}
            autoPlay={animation}
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
          {clockify().displayHours}:{clockify().displayMins}:{""}
          {clockify().displaySecs}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setanimation(true);
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
    </SafeAreaView>
  );
};
export default PlantCounter;
