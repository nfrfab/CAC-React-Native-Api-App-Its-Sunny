import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions, Platform } from 'react-native';
import { Input, Avatar, Image, Icon, Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import MapView, {Marker} from "react-native-maps";
import { map, size, filter } from "lodash";
import uuid from "random-uuid-v4";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Modal from '../Modal';

export default function AgregarCiudadForm(props) {
    const { toastRef, setMostrarLoading, navigation} = props;

    const [nombreCiudad, setNombreCiudad] = useState(null);
    const [nombreProvincia, setNombreProvincia] = useState(null);
    const [nombrePais, setNombrePais] = useState(null);

    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [coordenadasCiudad, setCoodenadasCiudad] = useState(null);

    const [currentLocation, setCurrentLocation] = useState({
        latitude: -34.61360009718764,
        longitude: -58.38182123377919,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    });

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
                nombre: nombreCiudad.toUpperCase(),
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
                nombreCiudad={nombreCiudad}
                nombrePais={nombrePais}
                setNombreCiudad={setNombreCiudad}
                setNombreProvincia={setNombreProvincia}
                setNombrePais={setNombrePais}
                coordenadasCiudad={coordenadasCiudad}
                setCurrentLocation={setCurrentLocation}
                setIsVisibleMap={setIsVisibleMap}
                toastRef={toastRef}
                setMostrarLoading={setMostrarLoading}
            />

            <Button 
                title="Grabar"
                buttonStyle={styles.btnStyle}
                onPress={ () =>
                    submit()
                }
            />

            <Map 
                isVisibleMap={isVisibleMap} 
                setIsVisibleMap={setIsVisibleMap} 
                toastRef={toastRef}
                currentLocation={currentLocation}
                setCurrentLocation={setCurrentLocation}
                setLocationCiudad={setCoodenadasCiudad} />
        </ScrollView>
    );
}

function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef, currentLocation, setCurrentLocation, setLocationCiudad } = props;

    //const [currentLocation, setCurrentLocation] = useState(null);
    /*
    const [currentLocation, setCurrentLocation] = useState({
        latitude: -34.61360009718764,
        longitude: -58.38182123377919,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    });
    */

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
    const { nombreCiudad, nombrePais, setNombreCiudad, setNombreProvincia, setNombrePais, coordenadasCiudad, setCurrentLocation, setIsVisibleMap, toastRef, setMostrarLoading } = props;

    const URL_API_PAIS_INFO = "https://restcountries.com/v3.1/name/";
    const getCodigoPais =  async () => {
        const url = URL_API_PAIS_INFO + nombrePais;
        axios.get(url)
            .then(response => {
                const codigoPais = response.data[0].cca2;
                getCoordenadasCiudadCodigoPais(codigoPais);
            })
            .catch(error => {
                setMostrarLoading(false);
                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            toastRef.current.show("Error buscando el pais. Verifique el nombre");
                            break;
                        default:
                            toastRef.current.show("Erros status " + error.response.status + ". Ver https://restcountries.com" );
                            break;        
                    }
                    
                } else {
                    toastRef.current.show("Error realizando peticion al servidor. No hubo respuesta...");
                }
                console.log(error);
        });
    };

    const getCoordenadasCiudadCodigoPais =  async (codicoPais) => {
        const ciudadCodPais = nombreCiudad + "," + codicoPais;
        const url = URL_API_CLIMA + "?q=" + ciudadCodPais + "&appid=" + API_KEY_WEATHER;
        axios.get(url)
            .then(response => {
                setMostrarLoading(false);
                const coordenadas = response.data.coord;
                setCurrentLocation({
                    latitude: coordenadas.lat,
                    longitude: coordenadas.lon,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                });
                setIsVisibleMap(true);
            })
            .catch(error => {
                setMostrarLoading(false);
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            toastRef.current.show("API KEY INVALIDA. Ver https://openweathermap.org" );
                            break;
                        case 404:
                            toastRef.current.show("Error buscando las coordenadas de la ciudad. Verifique los datos");
                            break;
                        default:
                            toastRef.current.show("Erros status " + error.response.status + ". Ver https://openweathermap.org" );
                            break;        
                    }
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    //toastRef.current.show("Error buscando las coordenadas de la ciudad. Verifique los datos");
                } else {
                    toastRef.current.show("Error realizando peticion al servidor. No hubo respuesta...");
                }
                console.log(error);
                
        });
    };

    const verificarDatos = async () => {
        if (!nombreCiudad || !nombrePais) {
            toastRef.current.show("Debe ingresar todos los campos");
        } else {
            setMostrarLoading(true);
            getCodigoPais();
        }
    }

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Pais"
                containerStyle={styles.input}
                onChange={(e) => setNombrePais(e.nativeEvent.text)}
            />    

            <Input
                placeholder="Provincia"
                containerStyle={styles.input}
                onChange={(e) => setNombreProvincia(e.nativeEvent.text)}
            />

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
                            verificarDatos()//setIsVisibleMap(true)
                        }
                    />
                }
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
