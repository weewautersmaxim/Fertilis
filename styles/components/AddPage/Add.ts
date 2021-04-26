import { StyleSheet } from "react-native";
export const Add = StyleSheet.create({
  section: {
    justifyContent: "center",
    alignItems: "center",
  },
  swipeBackground: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    width: "85%",
    height: 50,
    paddingLeft: 10,
    borderRadius: 5,
  },
  autoWidth: {
    width: "85%",
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  timer: {
    color: "white",
    fontSize: 20,
  },
});
