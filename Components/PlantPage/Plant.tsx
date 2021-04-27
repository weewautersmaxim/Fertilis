import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { basicStyle } from "../../styles/components/general/BasicStyles";
import { plant } from "../../styles/components/PlantPage/Plant";

//component inside header component.
const PlantComponent = ({ styles, title, imageSource, amount, time }: any) => {
  return (
    <View>
      <View style={styles}>
        <View style={basicStyle.center}>
          <Text style={basicStyle.text}>{title}</Text>
        </View>
        <View style={plant.icons}>
          <Image style={basicStyle.basicImage} source={imageSource} />
        </View>
      </View>
      <View style={plant.redDot}>
        <ImageBackground
          style={basicStyle.basicImage}
          source={require("../../assets/Plants/plantIcons/RedDot.png")}
        >
          <View
            style={[
              basicStyle.center,
              {
                top: 3.5,
              },
            ]}
          >
            <Text style={plant.counter}>{amount}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={basicStyle.center}>
        <Text style={basicStyle.text}>{time}</Text>
      </View>
    </View>
  );
};

export default PlantComponent;
