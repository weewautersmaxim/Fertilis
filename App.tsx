import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import Tasks from "./screens/Tasks/Index";
import Plants from "./screens/Plants";
import Timeline from "./screens/Timeline";
import { colors } from "./styles/colors/Theme";
import { initPlants } from "./utils/PlantDb";
import { imageDimensions } from "./styles/components/AppPage/Image";

export default function App() {
  //variables
  const tab = createBottomTabNavigator();

  //useEffects
  useEffect(() => {
    initPlants();
  }, []);

  //methods
  const customTabOptions = ({ route }: any) => ({
    tabBarIcon: ({}: any) => {
      if (route.name === "Tasks") {
        return (
          <View style={imageDimensions.dimensionsBox}>
            <Image
              style={imageDimensions.dimensions}
              source={require("./assets/Tasks.png")}
            />
          </View>
        );
      } else if (route.name === "Plants") {
        return (
          <View style={imageDimensions.dimensionsBox}>
            <Image
              style={imageDimensions.dimensions}
              source={require("./assets/plant.png")}
            />
          </View>
        );
      } else {
        return (
          <View style={imageDimensions.dimensionsBox}>
            <Image
              style={imageDimensions.dimensions}
              source={require("./assets/Timeline.png")}
            />
          </View>
        );
      }
    },
  });

  return (
    <NavigationContainer>
      <tab.Navigator
        screenOptions={customTabOptions}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: colors.grey,
          style: { height: 58 },
          labelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
        }}
      >
        <tab.Screen name="Tasks" component={Tasks} />
        <tab.Screen name="Plants" component={Plants} />
        <tab.Screen name="Timeline" component={Timeline} />
      </tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
