import React from "react";
import {createStackNavigator } from "@react-navigation/stack";
import AcercaDe from "../screens/about/AcercaDe";

const Stack = createStackNavigator();

export default function AboutStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="acercade" 
                component={AcercaDe} 
                options={{ title: "Acerca de" }}
            />
        </Stack.Navigator>
    );
}