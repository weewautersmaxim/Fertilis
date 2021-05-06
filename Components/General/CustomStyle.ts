import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors/Theme";

//custom style for taskpage
export const getStylesTasks = (customDisplay: any) =>
  StyleSheet.create({
    customSection: {
      display: customDisplay,
      borderBottomColor: "white",
      borderBottomWidth: 2,
    },
  });

//custom style for addpage
export const getStylesAdd = (
  opacityValue: any,
  OpacityValuePlant3: any,
  OpacityValuePlant4: any
) =>
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

export const getStylesPlants = (
  opacityAchievement1: any,
  achievOpacity2: any,
  achievOpacity3: any
) =>
  StyleSheet.create({
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

export const customFormValidationStyle = (
  displayValue: any,
  formBorder: string
) =>
  StyleSheet.create({
    message: {
      color: colors.red,
      fontSize: 15,
      display: displayValue,
    },
    border: {
      borderWidth: 2,
      borderColor: formBorder,
    },
  });
