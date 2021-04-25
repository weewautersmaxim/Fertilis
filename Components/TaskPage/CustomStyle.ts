import { StyleSheet } from "react-native";
export const getStyles = (customDisplay: any) =>
  StyleSheet.create({
    customSection: {
      display: customDisplay,
      borderBottomColor: "white",
      borderBottomWidth: 2,
    },
  });
