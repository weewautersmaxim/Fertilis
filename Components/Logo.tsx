import React from "react";
import { Image, View, Text } from "react-native";
import { colors } from "../styles/colors/Theme";

//component inside header component.
const Logo = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ width: 35, height: 35 }}>
        <Image
          style={{
            resizeMode: "contain",
            flex: 1,
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/logo.png")}
        />
      </View>
      <Text style={{ color: colors.white, fontSize: 20 }}>fertilis</Text>
    </View>
  );
};

export default Logo;
