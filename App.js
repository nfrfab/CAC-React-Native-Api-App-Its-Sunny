import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Cloud from './assets/img/cloud.png';
import Logo from './assets/img/logo.png';
import Rain from './assets/img/rain.png';
import Snow from './assets/img/snow.png';
import Storm from './assets/img/storm.png';
import SunCloud from './assets/img/sun_cloud.png';
import Sun from './assets/img/sun.png';
import { LogBox } from "react-native";
import Navigation from './app/navigations/Navigation';

LogBox.ignoreLogs(["Setting a timer"]);

const App= () => {
  const [animated, setAnimated ] = useState(false);
  const [snow] = useState(new Animated.Value(0));
  const [storm] = useState(new Animated.Value(0));
  const [rain] = useState(new Animated.Value(0));
  const [cloud] = useState(new Animated.Value(0));
  const [sun_cloud] = useState(new Animated.Value(0));
  const [sun] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.Value(0));
  const [hide] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(snow, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(snow, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(storm, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(storm, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(rain, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(rain, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(cloud, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(cloud, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(sun_cloud, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(sun_cloud, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(sun, {toValue: 200, duration: 500, useNativeDriver: false, }),
      Animated.timing(sun, {toValue: 0, duration: 500, useNativeDriver: false, }),
      Animated.timing(logo, {toValue: 200, duration: 1000, useNativeDriver: false, }),
      Animated.timing(hide, {toValue: 0, duration: 1000, useNativeDriver: false, delay: 2000,}),
    ]).start(() => setAnimated(true));
    
  }, []);

  if (!animated)
  return (
    <>
      <View style={styles.container}>
        <Animated.Image style={[styles.image, {width: snow}]} source={Snow}/>
        <Animated.Image style={[styles.image, {width: storm}]} source={Storm}/>
        <Animated.Image style={[styles.image, {width: rain}]} source={Rain}/>
        <Animated.Image style={[styles.image, {width: cloud}]} source={Cloud}/>
        <Animated.Image style={[styles.image, {width: sun_cloud}]} source={SunCloud}/>
        <Animated.Image style={[styles.image, {width: sun}]} source={Sun}/>
        <Animated.Image style={[styles.image, {width: logo, opacity: hide,}]} source={Logo}/>
      </View>
    </>
  );
  return (
    <Navigation/>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    flex: 1,
    position: 'absolute',
    height: 200,
    resizeMode: 'contain',
  }
});

export default App;



/*export default function App() {
  return (
    <Navigation/>
  );
}*/


