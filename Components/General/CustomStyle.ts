import { StyleSheet } from "react-native";

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
