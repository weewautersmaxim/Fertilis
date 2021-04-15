import { StyleSheet } from "react-native";

export const colors = {
  darkgreen: "#1A9375",
  grey: "#8798A5",
  darkgrey: "#707070",
  green: "#25B994",
  white: "#FFFFFF",
};

export const background = {
  neutral: StyleSheet.create({
    green: {
      backgroundColor: colors.green,
    },
    darkgreen: {
      backgroundColor: colors.darkgreen,
    },
  }),
  theme: {
    // ...
  },
};
