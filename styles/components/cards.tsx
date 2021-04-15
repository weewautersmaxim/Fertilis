import { Dimensions, StyleSheet } from "react-native";
export const card = StyleSheet.create({
  base: {
    borderRadius: 10,
    padding: 16,
  },
  holder: {
    flexDirection: "row",
    marginHorizontal: 32,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  small: {
    width: (Dimensions.get("screen").width - 3 * 32) / 2,
    height: (Dimensions.get("screen").width - 3 * 32) / 2,
    marginBottom: 16,

    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  large: {
    alignItems: "flex-start",
    flex: 1,
    marginHorizontal: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  insertTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  insertAuthor: {
    fontSize: 14,
    marginBottom: 8,
  },
  insertText: {
    flex: 1,
    lineHeight: 20,
    textAlignVertical: "top",
    width: "100%",
  },
});
