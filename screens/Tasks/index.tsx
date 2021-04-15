import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TaskPage from "./TaskPage";
import PlantCounter from "./PlantCounter";

const stack = createStackNavigator();
const Tasks = ({ navigation }: any) => {
  return (
    <stack.Navigator headerMode="none" initialRouteName="TaskPage">
      <stack.Screen name="TaskPage" component={TaskPage} />
      <stack.Screen name="PlantCounter" component={PlantCounter} />
    </stack.Navigator>
  );
};
export default Tasks;
