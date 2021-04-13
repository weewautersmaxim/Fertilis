import React from "react";
import { Button, Text, View } from "react-native";

const TaskPage = ({ navigation }: any) => {
  return (
    <View>
      <Text>TaskPage</Text>
      <Button
        title="Go to timer"
        onPress={() => navigation.navigate("PlantCounter")}
      />
    </View>
  );
};
export default TaskPage;
