import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { PlantCRUD } from "../../utils/PlantDb";
import { SQLResultSetRowList } from "expo-sqlite";
import Plant from "../../models/Plant";
import { useFocusEffect } from "@react-navigation/native";

const Plants = ({ navigation }: any) => {
  //useStates
  const [plantState, SetPlantState] = useState<Plant[]>([]);

  //one useState for every plant
  const [plantCounterIvy, SetPlantCounterIvy] = useState(0);
  const [plantCounterBasil, SetPlantCounterBasil] = useState(0);
  const [plantCounterKunal, SetPlantCounterKunal] = useState(0);
  const [plantCounterDahlia, SetPlantCounterDahlia] = useState(0);

  //opacity usestates
  const [opacityValueIvy, setOpacityValueIvy] = useState(1);
  const [opacityValueBasil, setOpacityValueBasil] = useState(1);
  const [opacityValueKunal, setOpacityValueKunal] = useState(1);
  const [opacityValueDahlia, setOpacityValueDahlia] = useState(1);

  //opacity usestate achievements
  const [achievOpacity1, SetAchievOpacity1] = useState(1);
  const [achievOpacity2, SetAchievOpacity2] = useState(1);
  const [achievOpacity3, SetAchievOpacity3] = useState(1);

  // useEffects;

  useEffect(() => {
    getPlants();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getPlants();
    }, [])
  );

  useEffect(() => {
    plantNumber();
  }, [plantState]);

  useEffect(() => {
    OpacityHandler();
    achievements();
  }, [
    plantCounterIvy,
    plantCounterBasil,
    plantCounterKunal,
    plantCounterDahlia,
  ]);

  //methods
  const getPlants = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await PlantCRUD.read.all();
    SetPlantState((rows as any)._array);
  };

  //get number of plants

  const plantNumber = () => {
    let numberIvy = 0;
    let numberBasil = 0;
    let numberKunal = 0;
    let numberDahlia = 0;

    for (let i = 0; i < plantState.length; i++) {
      switch (plantState[i].plant) {
        case "Ivy":
          numberIvy = numberIvy + 1;
          SetPlantCounterIvy(numberIvy);
          break;
        case "Basil":
          numberBasil = numberBasil + 1;
          SetPlantCounterBasil(numberBasil);
          break;
        case "Kunal":
          numberKunal = numberKunal + 1;
          SetPlantCounterKunal(numberKunal);
          break;
        default:
          numberDahlia = numberDahlia + 1;
          SetPlantCounterDahlia(numberDahlia);
          break;
      }
    }
  };

  const getStyles = (
    opacityBasil: any,
    opacityIvy: any,
    opacityKunal: any,
    opacityDahlia: any,
    opacityAchievement1: any,
    achievOpacity2: any,
    achievOpacity3: any
  ) =>
    StyleSheet.create({
      opacityIvy: {
        opacity: opacityIvy,
      },
      opacityBasil: {
        opacity: opacityBasil,
      },
      opacityKunal: {
        opacity: opacityKunal,
      },
      opacityDahlia: {
        opacity: opacityDahlia,
      },
      opacityAchievement1: {
        opacity: opacityAchievement1,
      },
      opacityAchievement2: {
        opacity: achievOpacity2,
      },
      opacityAchievement3: {
        opacity: achievOpacity3,
      },
    });
  const styles = getStyles(
    opacityValueBasil,
    opacityValueIvy,
    opacityValueKunal,
    opacityValueDahlia,
    achievOpacity1,
    achievOpacity2,
    achievOpacity3
  );

  const OpacityHandler = () => {
    if (plantCounterIvy == 0) {
      setOpacityValueIvy(0.4);
    } else {
      setOpacityValueIvy(1);
    }

    if (plantCounterBasil == 0) {
      setOpacityValueBasil(0.4);
    } else {
      setOpacityValueBasil(1);
    }

    if (plantCounterKunal == 0) {
      setOpacityValueKunal(0.4);
    } else {
      setOpacityValueKunal(1);
    }

    if (plantCounterDahlia == 0) {
      setOpacityValueDahlia(0.4);
    } else {
      setOpacityValueDahlia(1);
    }
  };

  const achievements = () => {
    let amountOfPlants =
      plantCounterIvy +
      plantCounterBasil +
      plantCounterKunal +
      plantCounterDahlia;

    if (amountOfPlants >= 5) {
      SetAchievOpacity1(1);
    } else {
      SetAchievOpacity1(0.4);
    }

    if (
      plantCounterIvy != 0 &&
      plantCounterBasil != 0 &&
      plantCounterKunal != 0 &&
      plantCounterDahlia != 0
    ) {
      SetAchievOpacity2(1);
    } else {
      SetAchievOpacity2(0.4);
    }

    if (amountOfPlants >= 25) {
      SetAchievOpacity3(1);
    } else {
      SetAchievOpacity3(0.4);
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
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            Plants:
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
          {/* first plant */}
          <View>
            <View style={styles.opacityIvy}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>Ivy</Text>
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
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                position: "absolute",
                left: 40,
                top: 60,
              }}
            >
              <ImageBackground
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={{
                    top: 3.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {plantCounterIvy}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>10:00</Text>
            </View>
          </View>
          {/* new plant */}
          <View>
            <View style={styles.opacityBasil}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>Basil</Text>
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
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                position: "absolute",
                left: 40,
                top: 60,
              }}
            >
              <ImageBackground
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={{
                    top: 3.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {plantCounterBasil}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>30:00</Text>
            </View>
          </View>
          {/* New Plant */}
          <View>
            <View style={styles.opacityKunal}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>Kunal</Text>
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
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                position: "absolute",
                left: 40,
                top: 60,
              }}
            >
              <ImageBackground
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={{
                    top: 3.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {plantCounterKunal}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </View>
          {/* new plant */}
          <View>
            <View style={styles.opacityDahlia}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>Dahlia</Text>
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
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                position: "absolute",
                left: 40,
                top: 60,
              }}
            >
              <ImageBackground
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={{
                    top: 3.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {plantCounterDahlia}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>90:00</Text>
            </View>
          </View>
        </View>
      </View>
      {/* end section plants */}
      {/* start section achievments */}
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
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            Achievements:
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
          {/* achievement 1 */}
          <TouchableOpacity style={{ width: 100 }}>
            <View style={styles.opacityAchievement1}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Getting started
                  </Text>
                </View>
                <View style={{ width: 60, height: 60 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      flex: 1,
                      width: "100%",
                      height: "100%",
                    }}
                    source={require("../../assets/c7805ee9aa1a16baaa33a7b1be2f220e.png")}
                  />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 12, textAlign: "center" }}
              >
                "Get a total of 5 plants"
              </Text>
            </View>
          </TouchableOpacity>
          {/* achievement 2 */}
          <TouchableOpacity style={{ width: 100 }}>
            <View style={styles.opacityAchievement2}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Catch em all
                  </Text>
                </View>
                <View style={{ width: 60, height: 60 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      flex: 1,
                      width: "100%",
                      height: "100%",
                    }}
                    source={require("../../assets/c7805ee9aa1a16baaa33a7b1be2f220e.png")}
                  />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 12, textAlign: "center" }}
              >
                "Get at least one of every plant"
              </Text>
            </View>
          </TouchableOpacity>
          {/* achievement 3 */}
          <TouchableOpacity style={{ width: 100 }}>
            <View style={styles.opacityAchievement3}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Collector
                  </Text>
                </View>
                <View style={{ width: 60, height: 60 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      flex: 1,
                      width: "100%",
                      height: "100%",
                    }}
                    source={require("../../assets/c7805ee9aa1a16baaa33a7b1be2f220e.png")}
                  />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 12, textAlign: "center" }}
              >
                "Get a total of 25 plants"
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Plants;
