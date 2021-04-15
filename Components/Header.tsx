import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Logo from "../Components/Logo";
import { header } from "../styles/components/header";

const Header = () => {
  return (
    <View style={header.headercontainer}>
      <TouchableOpacity
        style={{
          width: "33%",
          flexDirection: "row",
        }}
        onPress={() => {
          console.log("back");
        }}
      >
        <View style={{ width: 20, height: 20, marginLeft: 10, marginRight: 5 }}>
          <Image
            style={{
              resizeMode: "contain",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
            source={require("../assets/Back.png")}
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

      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          width: "33%",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          console.log("add");
        }}
      ></TouchableOpacity>
    </View>
  );
};
export default Header;
