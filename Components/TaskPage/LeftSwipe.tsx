import React from "react";
import { View, Text } from "react-native";
import { Swipe } from "../../styles/components/TaskPage/LeftSwipe";

export const leftSwipe = () => {
  return (
    <View style={Swipe.swipeBox}>
      <Text style={Swipe.swipeBackground}>Delete</Text>
    </View>
  );
};
