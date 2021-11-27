import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import AboutStack from "./AboutStack";
import HomeStack from "./HomeStack";
import WeatherStack from "./WeatherStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="homeStack"

                screenOptions={({ route })  => ({
                    style: { backgroundColor: 'orange'},
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarInactiveTintColor: "#646464",
                    tabBarActiveTintColor: "rgb(71,149,212)",
                })}
            >
                <Tab.Screen 
                    name="homeStack" 
                    component={HomeStack} 
                    options={{ title: "Proposito", headerShown: false }}
                />
                <Tab.Screen 
                    name="weatherStack" 
                    component={WeatherStack} 
                    options={{ title: "Clima", headerShown: false }}
                />
                <Tab.Screen 
                    name="aboutStack" 
                    component={AboutStack} 
                    options={{ title: "Acerca de", headerShown: false }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "homeStack":
            iconName = "compass-outline";
            break;
        case "weatherStack":
            iconName = "heart-outline";
            break;
        case "aboutStack":
            iconName = "star-outline";
            break;
    
        default:
            break;
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    );
}