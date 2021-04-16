import React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { Tasks } from "../../styles/components/Tasks";

const TaskPage = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      {/* header */}
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
            navigation.navigate("AddPage");
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
              source={require("../../assets/Add.png")}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* unfinished section */}
      <View style={Tasks.base}>
        <View style={Tasks.taskSection}>
          <Text style={{ color: "white", fontSize: 18 }}>Unfinished:</Text>
        </View>
        {/* end unfinished section */}
        <ScrollView>
          {/* here start tasks */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PlantCounter")}
            style={Tasks.task}
          >
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
          </TouchableOpacity>
        </ScrollView>
        {/* end tasks */}
      </View>
      <View style={Tasks.base}>
        <View style={Tasks.taskSection}>
          <Text style={{ color: "white", fontSize: 18 }}>New:</Text>
        </View>
        <ScrollView>
          {/* here start tasks */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PlantCounter")}
            style={Tasks.task}
          >
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
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TaskPage;
