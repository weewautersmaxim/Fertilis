import { StyleSheet } from "react-native";
export const Tasks = StyleSheet.create({
  base: {
    marginLeft: 15,
    marginRight: 15,
  },
  taskSection: {
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginTop: 10,
  },
  task: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    padding: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskImage: {
    resizeMode: "contain",
    flex: 1,
    width: "100%",
    height: "100%",
    marginLeft: 8,
  },
});
