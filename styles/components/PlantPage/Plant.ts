import { StyleSheet } from "react-native";
export const plant = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  rowSection: {
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowWidth: {
    width: "85%",
  },
  redDot: {
    width: 32,
    height: 32,
    position: "absolute",
    left: 40,
    top: 60,
  },
  counter: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    width: 60,
    height: 60,
  },
  achievement: {
    color: "white",
    fontSize: 14,
  },
  description: {
    color: "white",
    fontSize: 12,
  },
});
