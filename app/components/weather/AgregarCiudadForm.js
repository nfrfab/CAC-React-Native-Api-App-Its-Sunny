import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions, Platform } from 'react-native';
import { Input, Avatar, Image, Icon, Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import MapView, {Marker} from "react-native-maps";
import { map, size, filter } from "lodash";
import uuid from "random-uuid-v4";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from '../Modal';

export default function AgregarCiudadForm(props) {
    const { toastRef, setIsLoading, navigation} = props;

    const [nombreCiudad, setNombreCiudad] = useState(null);
    const [nombreProvincia, setNombreProvincia] = useState(null);
    const [nombrePais, setNombrePais] = useState(null);

    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [coordenadasCiudad, setCoodenadasCiudad] = useState(null);


    const setClaveValor = async (clave, valor) => {
        try {
            await AsyncStorage.setItem(clave, valor);
        } catch (error) {
            console.log(error);
        }
    };

    const grabarClaveObjeto = async (clave, value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(clave, jsonValue);
          return true;
        } catch (error) {
          // saving error
          console.log(error);
          return false;
        }
    }

    const getValor = async (valor) => {
        try {
          const value = await AsyncStorage.getItem(valor);
          if(value !== null) {
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }


    const getObjecto = async (clave) => {
        try {
            const jsonValue = await AsyncStorage.getItem(clave)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
            console.log(e);
            return null;
        }
    }

    const submit = async () => {
        if (!nombreCiudad || !nombreProvincia || !nombrePais) {
            toastRef.current.show("Debe ingresar todos los campos");
            //console.log("no OK no OK");
        } else if (!coordenadasCiudad) {
            toastRef.current.show("Debe ubicar la ciudad en el mapa...");
        } else {
            let ciudades = await getObjecto("ciudades");
            if (!ciudades) {
                ciudades = [];
            }
            const ciudad1 = {
                id: uuid(),
                nombre: nombreCiudad,
                provincia: nombreProvincia,
                pais: nombrePais,
                coordenadas: coordenadasCiudad
            };

            const ciudadesTemp = [...ciudades, ciudad1];

            const objetoGrabado = await grabarClaveObjeto("ciudades", ciudadesTemp);
            if (objetoGrabado) {
                console.log("ciudad grabada...");
                navigation.goBack();
            } else {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd 
                setNombreCiudad={setNombreCiudad}
                setNombreProvincia={setNombreProvincia}
                setNombrePais={setNombrePais}
                coordenadasCiudad={coordenadasCiudad}
                setIsVisibleMap={setIsVisibleMap} 
            />

            <Button 
                title="Grabar"
                buttonStyle={styles.btnStyle}
                onPress={ () =>
                    submit()
                }
            />

            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} toastRef={toastRef} setLocationCiudad={setCoodenadasCiudad} />
        </ScrollView>
    );
}

function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef, setLocationCiudad } = props;

    //const [currentLocation, setCurrentLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: -34.61360009718764,
        longitude: -58.38182123377919,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    });

    const guardarLocalizacionCiudad = () => {
        setLocationCiudad(currentLocation);
        setIsVisibleMap(false);
        toastRef.current.show("Se guardo la localizacion");
    };

    useEffect(() => {
        (async () => {
            let permissionStatus = null;
            if (Platform.OS === 'ios') {
                let {status} = await Permissions.askAsync(Permissions.LOCATION);
                permissionStatus = status;
            } else {
                let {status} = await Location.requestForegroundPermissionsAsync();
                permissionStatus = status;
            }
            if (permissionStatus !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            });
            
        })();
    }, [])
    
    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {currentLocation && (
                    <MapView 
                        style={styles.mapStyle}
                        initialRegion={currentLocation}
                        showsUserLocation={true}
                        onRegionChange={(region) => setCurrentLocation(region)}
                    >
                        <Marker 
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude
                            }}
                            draggable
                        />
                    </MapView>
                    
                )}
                <View style={styles.mapBtn}>
                <Button title="Guardar" 
                        containerStyle={styles.mapBtnContainerGuardar} 
                        buttonStyle={styles.mapBtnViewGuardar}
                        onPress={() => guardarLocalizacionCiudad()}
                    />
                    <Button title="Cancelar" 
                        containerStyle={styles.mapBtnContainerCancelar} 
                        buttonStyle={styles.mapBtnViewCancelar}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    );
}

function FormAdd(props) {
    const { setNombreCiudad, setNombreProvincia, setNombrePais, coordenadasCiudad, setIsVisibleMap } = props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Ciudad"
                containerStyle={styles.input}
                onChange={(e) => setNombreCiudad(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="google-maps"
                        color={coordenadasCiudad ? "#00a680" :"#c2c2c2"}
                        onPress={() =>
                            setIsVisibleMap(true)
                        }
                    />
                }
            />

            <Input
                placeholder="Provincia"
                containerStyle={styles.input}
                onChange={(e) => setNombreProvincia(e.nativeEvent.text)}
            />

            <Input
                placeholder="Pais"
                containerStyle={styles.input}
                onChange={(e) => setNombrePais(e.nativeEvent.text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",

    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10
    },
    mapStyle: {
        width: "100%",
        height: 450,
    },
    mapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    mapBtnContainerCancelar: {
        paddingLeft: 5
    },
    mapBtnViewCancelar: {
        backgroundColor: "#a60d0d"
    },
    mapBtnContainerGuardar: {
        paddingRight: 5
    },
    mapBtnViewGuardar: {
        backgroundColor: "#00a680"
    },
    btnStyle: {
        backgroundColor: "#00a680",
        margin: 20
    },
})
