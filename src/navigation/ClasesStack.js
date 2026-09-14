import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/clasesScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ClasesScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
