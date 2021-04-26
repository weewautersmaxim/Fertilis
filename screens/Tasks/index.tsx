import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TaskPage from "./TaskPage";
import PlantCounter from "./PlantCounter";
import AddPage from "./AddPage";

const stack = createStackNavigator();
const Tasks = () => {
  return (
    <stack.Navigator headerMode="none" initialRouteName="TaskPage">
      <stack.Screen name="TaskPage" component={TaskPage} />
      <stack.Screen name="PlantCounter" component={PlantCounter} />
      <stack.Screen name="AddPage" component={AddPage} />
    </stack.Navigator>
  );
};
export default Tasks;
