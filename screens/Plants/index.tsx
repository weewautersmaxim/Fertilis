import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import { background } from "../../styles/colors/Theme";
import { header } from "../../styles/components/general/StackHeader";
import { PlantCRUD } from "../../utils/PlantDb";
import { SQLResultSetRowList } from "expo-sqlite";
import Plant from "../../models/Plant";
import { useFocusEffect } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";
import { getStylesPlants } from "../../Components/General/CustomStyle";
import { plant } from "../../styles/components/PlantPage/Plant";
import { basicStyle } from "../../styles/components/general/BasicStyles";

const Plants = ({ navigation }: any) => {
  const [image, SetImage] = useState<Asset | null>(null);
  const [achievement, SetAchievement] = useState(
    require("../../assets/achievements/achievement1.png")
  );
  useEffect(() => {
    imageDownload();
  }, []);

  useEffect(() => {
    imageDownload();
  }, [achievement]);

  const imageDownload = () => {
    const imageDownload = Asset.fromModule(achievement);
    imageDownload.downloadAsync();
    SetImage(imageDownload);
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`sharing isn't available on your platform`);
      return;
    }
    const messageText = "Text that you want to share goes here";
    let options = {
      dialogTitle: messageText,
    };
    const url = image?.localUri!;

    await Sharing.shareAsync(url, options);
  };

  //useStates
  const [plantState, SetPlantState] = useState<Plant[]>([]);

  //one useState for every plant
  const [plantCounterIvy, SetPlantCounterIvy] = useState(0);
  const [plantCounterBasil, SetPlantCounterBasil] = useState(0);
  const [plantCounterKunal, SetPlantCounterKunal] = useState(0);
  const [plantCounterDahlia, SetPlantCounterDahlia] = useState(0);

  //opacity usestates
  const [opacityValueIvy, SetOpacityValueIvy] = useState(1);
  const [opacityValueBasil, SetOpacityValueBasil] = useState(1);
  const [opacityValueKunal, SetOpacityValueKunal] = useState(1);
  const [opacityValueDahlia, SetOpacityValueDahlia] = useState(1);

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
    opacityHandler();
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

  const styles = getStylesPlants(
    opacityValueBasil,
    opacityValueIvy,
    opacityValueKunal,
    opacityValueDahlia,
    achievOpacity1,
    achievOpacity2,
    achievOpacity3
  );

  const opacityHandler = () => {
    if (plantCounterIvy == 0) {
      SetOpacityValueIvy(0.4);
    } else {
      SetOpacityValueIvy(1);
    }

    if (plantCounterBasil == 0) {
      SetOpacityValueBasil(0.4);
    } else {
      SetOpacityValueBasil(1);
    }

    if (plantCounterKunal == 0) {
      SetOpacityValueKunal(0.4);
    } else {
      SetOpacityValueKunal(1);
    }

    if (plantCounterDahlia == 0) {
      SetOpacityValueDahlia(0.4);
    } else {
      SetOpacityValueDahlia(1);
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

  //when starting app, no tasks exist, hide error that he can't find any tasks yet...
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
        <View
          style={{
            width: "33%",
          }}
        ></View>
      </View>
      {/* end header */}
      <View style={basicStyle.center}>
        <View style={plant.rowWidth}>
          <Text style={plant.title}>Plants:</Text>
        </View>
      </View>
      <View style={basicStyle.center}>
        <View style={plant.rowSection}>
          {/* first plant */}
          <View>
            <View style={styles.opacityIvy}>
              <View style={basicStyle.center}>
                <Text style={basicStyle.text}>Ivy</Text>
              </View>
              <View style={plant.icons}>
                <Image
                  style={basicStyle.basicImage}
                  source={require("../../assets/Plants/plantIcons/Plant1.png")}
                />
              </View>
            </View>
            <View style={plant.redDot}>
              <ImageBackground
                style={basicStyle.basicImage}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={[
                    basicStyle.center,
                    {
                      top: 3.5,
                    },
                  ]}
                >
                  <Text style={plant.counter}>{plantCounterIvy}</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={basicStyle.center}>
              <Text style={basicStyle.text}>10:00</Text>
            </View>
          </View>
          {/* new plant */}
          <View>
            <View style={styles.opacityBasil}>
              <View style={basicStyle.center}>
                <Text style={basicStyle.text}>Basil</Text>
              </View>
              <View style={plant.icons}>
                <Image
                  style={basicStyle.basicImage}
                  source={require("../../assets/Plants/plantIcons/Plant2.png")}
                />
              </View>
            </View>
            <View style={plant.redDot}>
              <ImageBackground
                style={basicStyle.basicImage}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={[
                    basicStyle.center,
                    {
                      top: 3.5,
                    },
                  ]}
                >
                  <Text style={plant.counter}>{plantCounterBasil}</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={basicStyle.center}>
              <Text style={basicStyle.text}>30:00</Text>
            </View>
          </View>
          {/* New Plant */}
          <View>
            <View style={styles.opacityKunal}>
              <View style={basicStyle.center}>
                <Text style={basicStyle.text}>Kunal</Text>
              </View>
              <View style={plant.icons}>
                <Image
                  style={basicStyle.basicImage}
                  source={require("../../assets/Plants/plantIcons/Plant3.png")}
                />
              </View>
            </View>
            <View style={plant.redDot}>
              <ImageBackground
                style={basicStyle.basicImage}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={[
                    basicStyle.center,
                    {
                      top: 3.5,
                    },
                  ]}
                >
                  <Text style={plant.counter}>{plantCounterKunal}</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={basicStyle.center}>
              <Text style={basicStyle.text}>60:00</Text>
            </View>
          </View>
          {/* new plant */}
          <View>
            <View style={styles.opacityDahlia}>
              <View style={basicStyle.center}>
                <Text style={basicStyle.text}>Dahlia</Text>
              </View>
              <View style={plant.icons}>
                <Image
                  style={basicStyle.basicImage}
                  source={require("../../assets/Plants/plantIcons/Plant4.png")}
                />
              </View>
            </View>
            <View style={plant.redDot}>
              <ImageBackground
                style={basicStyle.basicImage}
                source={require("../../assets/Plants/plantIcons/RedDot.png")}
              >
                <View
                  style={[
                    basicStyle.center,
                    {
                      top: 3.5,
                    },
                  ]}
                >
                  <Text style={plant.counter}>{plantCounterDahlia}</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={basicStyle.center}>
              <Text style={basicStyle.text}>90:00</Text>
            </View>
          </View>
        </View>
      </View>
      {/* end section plants */}
      {/* start section achievments */}
      <View style={basicStyle.center}>
        <View style={plant.rowWidth}>
          <Text style={plant.title}>Achievements:</Text>
        </View>
      </View>
      <View style={basicStyle.center}>
        <View style={plant.rowSection}>
          {/* achievement 1 */}
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              SetAchievement(() =>
                require("../../assets/achievements/achievement1.png")
              );
              openShareDialogAsync();
            }}
          >
            <View style={styles.opacityAchievement1}>
              <View style={basicStyle.center}>
                <View style={basicStyle.center}>
                  <Text style={plant.achievement}>Getting started</Text>
                </View>
                <View style={plant.icons}>
                  <Image
                    style={basicStyle.basicImage}
                    source={require("../../assets/achievements/achievement1.png")}
                  />
                </View>
              </View>
            </View>
            <View style={basicStyle.center}>
              <Text style={[plant.description, { textAlign: "center" }]}>
                "Get a total of 5 plants"
              </Text>
            </View>
          </TouchableOpacity>
          {/* achievement 2 */}
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              SetAchievement(
                require("../../assets/achievements/achievement2.png")
              );
              openShareDialogAsync();
            }}
          >
            <View style={styles.opacityAchievement2}>
              <View style={basicStyle.center}>
                <View style={basicStyle.center}>
                  <Text style={plant.achievement}>Catch em all</Text>
                </View>
                <View style={plant.icons}>
                  <Image
                    style={basicStyle.basicImage}
                    source={require("../../assets/achievements/achievement2.png")}
                  />
                </View>
              </View>
            </View>
            <View style={basicStyle.center}>
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
              <View style={basicStyle.center}>
                <View style={basicStyle.center}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Collector
                  </Text>
                </View>
                <View style={plant.icons}>
                  <Image
                    style={basicStyle.basicImage}
                    source={require("../../assets/achievements/achievement3.png")}
                  />
                </View>
              </View>
            </View>
            <View style={basicStyle.center}>
              <Text style={[plant.description, { textAlign: "center" }]}>
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
