import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Logo from "../Components/Logo";
import { header } from "../styles/components/header";

const Header_Without_Back = () => {
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
      ></TouchableOpacity>
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
      >
        <Text style={header.addButton}>Add</Text>
        <View
          style={{ width: 45, height: 45, marginLeft: 10, marginRight: 20 }}
        >
          <Image
            style={{
              resizeMode: "contain",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
            source={require("../assets/Add.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header_Without_Back;
