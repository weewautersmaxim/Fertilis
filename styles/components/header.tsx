import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  logo: {
    width: 75,
    height: 20,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  backButton: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  addButton: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  imageContainer: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  backImage: {
    resizeMode: "contain",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
