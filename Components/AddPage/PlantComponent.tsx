import React from "react";
import { View, Text, Image } from "react-native";
import { Add } from "../../styles/components/AddPage/Add";

//component inside header component.
const PlantComponent = ({ title, imageSource, timer }: any) => {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
      <View style={Add.imageContainer}>
        <Image style={Add.image} source={imageSource} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={Add.timer}>{timer}</Text>
      </View>
    </View>
  );
};

export default PlantComponent;
