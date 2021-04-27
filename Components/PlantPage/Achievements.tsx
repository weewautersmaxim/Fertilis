import React from "react";
import { View, Text, Image } from "react-native";
import { basicStyle } from "../../styles/components/general/BasicStyles";
import { plant } from "../../styles/components/PlantPage/Plant";

//component inside header component.
const Achievement = ({ styles,title, imageSource, description }: any) => {
  return (
    <View>
      <View style={styles}>
        <View style={basicStyle.center}>
          <View style={basicStyle.center}>
            <Text style={plant.achievement}>{title}</Text>
          </View>
          <View style={plant.icons}>
            <Image style={basicStyle.basicImage} source={imageSource} />
          </View>
        </View>
      </View>
      <View style={basicStyle.center}>
        <Text style={[plant.description, { textAlign: "center" }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Achievement;
