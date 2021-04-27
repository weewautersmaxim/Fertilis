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
import Logo from "../../Components/General/Logo";
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

import Achievement from "../../Components/PlantPage/Achievements";
import Section from "../../Components/PlantPage/Section";
import PlantComponent from "../../Components/PlantPage/Plant";

const Plants = ({ navigation }: any) => {
  //useStates
  const [plantState, SetPlantState] = useState<Plant[]>([]);

  //one useState for every plant
  const [plantCounterIvy, SetPlantCounterIvy] = useState(0);
  const [plantCounterBasil, SetPlantCounterBasil] = useState(0);
  const [plantCounterKunal, SetPlantCounterKunal] = useState(0);
  const [plantCounterDahlia, SetPlantCounterDahlia] = useState(0);

  //opacity useStates
  const [opacityValueIvy, SetOpacityValueIvy] = useState(1);
  const [opacityValueBasil, SetOpacityValueBasil] = useState(1);
  const [opacityValueKunal, SetOpacityValueKunal] = useState(1);
  const [opacityValueDahlia, SetOpacityValueDahlia] = useState(1);

  //opacity useState achievements
  const [achievOpacity1, SetAchievOpacity1] = useState(1);
  const [achievOpacity2, SetAchievOpacity2] = useState(1);
  const [achievOpacity3, SetAchievOpacity3] = useState(1);

  //useStates for sharing
  const [image01, SetImage01] = useState<Asset | null>(null);
  const [image02, SetImage02] = useState<Asset | null>(null);
  const [image03, SetImage03] = useState<Asset | null>(null);

  // useEffects;

  useEffect(() => {
    getPlants();
    imageDownload();
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

  //sharing functionality
  const imageDownload = () => {
    const imageDownload = Asset.fromModule(
      require("../../assets/achievements/achievement1.png")
    );
    imageDownload.downloadAsync();
    SetImage01(imageDownload);

    const imageDownload2 = Asset.fromModule(
      require("../../assets/achievements/achievement2.png")
    );
    imageDownload2.downloadAsync();
    SetImage02(imageDownload2);

    const imageDownload3 = Asset.fromModule(
      require("../../assets/achievements/achievement3.png")
    );
    imageDownload3.downloadAsync();
    SetImage03(imageDownload3);
  };

  const openShareDialogAsync = async (image: Asset | null) => {
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
      <Section title={"Plants:"}></Section>
      <View style={basicStyle.center}>
        <View style={plant.rowSection}>
          {/* first plant */}
          <PlantComponent
            style={styles.opacityIvy}
            title={"Ivy"}
            imageSource={require("../../assets/Plants/plantIcons/Plant1.png")}
            amount={plantCounterIvy}
            timer={"10:00"}
          ></PlantComponent>
          {/* new plant */}
          <PlantComponent
            style={styles.opacityBasil}
            title={"Basil"}
            imageSource={require("../../assets/Plants/plantIcons/Plant2.png")}
            amount={plantCounterBasil}
            timer={"30:00"}
          ></PlantComponent>
          {/* New Plant */}
          <PlantComponent
            style={styles.opacityKunal}
            title={"Kunal"}
            imageSource={require("../../assets/Plants/plantIcons/Plant3.png")}
            amount={plantCounterKunal}
            timer={"60:00"}
          ></PlantComponent>
          {/* new plant */}
          <PlantComponent
            style={styles.opacityDahlia}
            title={"Dahlia"}
            imageSource={require("../../assets/Plants/plantIcons/Plant4.png")}
            amount={plantCounterDahlia}
            timer={"90:00"}
          ></PlantComponent>
        </View>
      </View>
      {/* end section plants */}
      {/* start section achievments */}
      <Section title={"Achievements:"}></Section>
      <View style={basicStyle.center}>
        <View style={plant.rowSection}>
          {/* achievement 1 */}
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              openShareDialogAsync(image01);
            }}
          >
            <Achievement
              styles={styles.opacityAchievement1}
              title={"Getting started"}
              imageSource={require("../../assets/achievements/achievement1.png")}
              description={"Get a total of 5 plants"}
            ></Achievement>
          </TouchableOpacity>
          {/* achievement 2 */}
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              openShareDialogAsync(image02);
            }}
          >
            <Achievement
              styles={styles.opacityAchievement2}
              title={"Catch em all"}
              imageSource={require("../../assets/achievements/achievement2.png")}
              description={"Get at least one of every plant"}
            ></Achievement>
          </TouchableOpacity>
          {/* achievement 3 */}
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              openShareDialogAsync(image03);
            }}
          >
            <Achievement
              styles={styles.opacityAchievement3}
              title={"Collector"}
              imageSource={require("../../assets/achievements/achievement3.png")}
              description={"Get a total of 25 plants"}
            ></Achievement>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Plants;
