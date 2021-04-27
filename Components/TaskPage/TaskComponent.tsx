import React from "react";
import { View, Text, Image } from "react-native";
import { Tasks } from "../../styles/components/TaskPage/Tasks";

//component inside header component.
const Section = ({ ImageSource, activity, timer }: any) => {
  return (
    <View style={Tasks.task}>
      <View style={Tasks.taskImageContainer}>
        <Image style={Tasks.taskImage} source={ImageSource} />
      </View>
      <Text style={[Tasks.text, { width: "35%", marginLeft: 20 }]}>
        {activity}
      </Text>
      <Text style={[Tasks.text, { marginLeft: 5, marginRight: 15 }]}>
        {timer}
      </Text>
    </View>
  );
};

export default Section;
