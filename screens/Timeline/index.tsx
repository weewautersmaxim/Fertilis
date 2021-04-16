import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Slider,
  SafeAreaViewBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { Tasks } from "../../styles/components/Tasks";

const Timeline = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      {/* header */}
      <View style={header.headercontainer}>
        <TouchableOpacity
          style={{
            width: "33%",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("TaskPage")}
        >
          <View style={header.imageContainer}>
            <Image
              style={header.backImage}
              source={require("../../assets/Back.png")}
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
      {/* end header */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 5,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            12/05/2020:
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "85%" }}>
          <View style={Tasks.task}>
            <View style={{ width: 65, height: 65 }}>
              <Image
                style={Tasks.taskImage}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <Text style={{ fontSize: 25, color: "#707070" }}>Homework</Text>
            <Text style={{ fontSize: 25, color: "#707070", marginRight: 20 }}>
              60:00
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Timeline;
