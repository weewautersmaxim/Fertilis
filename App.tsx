import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import Tasks from "./screens/Tasks";
import Plants from "./screens/Plants";
import Timeline from "./screens/Timeline";
import { colors } from "./styles/colors/theme";

export default function App() {
  const Tab = createBottomTabNavigator();

  const customTabOptions = ({ route }: any) => ({
    tabBarIcon: ({ color, size }: any) => {
      let iconName = "someting";

      if (route.name === "Tasks") {
        return (
          <View
            style={{
              width: 65,
              height: 30,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "50%",
                height: "50%",
              }}
              source={require("./assets/Tasks.png")}
            />
          </View>
        );
      } else if (route.name === "Plants") {
        return (
          <View
            style={{
              width: 65,
              height: 30,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "50%",
                height: "50%",
              }}
              source={require("./assets/plant.png")}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{
              width: 65,
              height: 30,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "50%",
                height: "50%",
              }}
              source={require("./assets/Timeline.png")}
            />
          </View>
        );
      }

      // You can return any component that you like here!
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
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
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Plants" component={Plants} />
        <Tab.Screen name="Timeline" component={Timeline} />
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
