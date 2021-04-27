import React from "react";
import { View, Text } from "react-native";
import { basicStyle } from "../../styles/components/general/BasicStyles";
import { plant } from "../../styles/components/PlantPage/Plant";

//component inside header component.
const Section = ({ title }: any) => {
  return (
    <View style={basicStyle.center}>
      <View style={plant.rowWidth}>
        <Text style={plant.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Section;
