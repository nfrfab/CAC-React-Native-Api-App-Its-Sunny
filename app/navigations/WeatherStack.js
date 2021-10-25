import React from "react";
import {createStackNavigator } from "@react-navigation/stack";
import Ciudades from "../screens/weather/Ciudades";
import AgregarCiudad from "../screens/weather/AgregarCiudad";
import ClimaCiudad from "../screens/weather/ClimaCiudad";

const Stack = createStackNavigator();

export default function WeatherStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="ciudades" 
                component={Ciudades} 
                options={{ title: "Mis ciudades" }}
            />
            <Stack.Screen 
                name="agregarCiudad" 
                component={AgregarCiudad} 
                options={{ title: "Agregar ciudad" }}
            />
            <Stack.Screen 
                name="climaCiudad" 
                component={ClimaCiudad} 
                options={{ title: "Clima en la ciudad" }}
            />
        </Stack.Navigator>
    );
}