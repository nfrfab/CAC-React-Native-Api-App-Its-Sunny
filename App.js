import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from "react-native";
import Navigation from './app/navigations/Navigation';

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <Navigation/>
  );
}


