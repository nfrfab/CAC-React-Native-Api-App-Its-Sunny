import React from "react";
import {createStackNavigator } from "@react-navigation/stack";
import Proposito from "../screens/home/Proposito";


const Stack = createStackNavigator();

export default function HomeStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="proposito" 
                component={Proposito} 
                options={{ title: "Proposito de la app" }}
            />
        </Stack.Navigator>
    );
}