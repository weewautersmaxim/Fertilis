import React from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header_Without_Back from "../../Components/Header_without_backbutton";
import { background } from "../../styles/colors/theme";
import { Tasks } from "../../styles/components/Tasks";

const TaskPage = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      <Header_Without_Back />
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
