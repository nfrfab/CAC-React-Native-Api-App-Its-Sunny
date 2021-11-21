import React, { useState, useEffect, useLayoutEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import Toast from "react-native-easy-toast";
import axios from 'axios';

import MyMaps from '../../components/MyMaps.js';
import Loading from '../../components/Loading.js';

import "../../utils/varsys.js";
import { size } from 'lodash';
export default function ClimaCiudad(props) {
    const { navigation, route } = props;
    const { ciudadElegida } = route.params;
    const ciudad = JSON.parse(ciudadElegida);

    const toastRef = useRef();
    const [mostrarLoading, setMostrarLoading] = useState(true);

    const [iconUrl, setIconUrl] = useState(null);
    const [clima, setClima] = useState(null);

    useLayoutEffect(() => navigation.setOptions({
        title: ciudad.nombre
    }), []);

    const getClimaCiudad =  async () => {
        const weatherIconUrl = "http://openweathermap.org/img/w/" + "04n" + ".png";
        console.log(weatherIconUrl);
        
        const url = URL_API_CLIMA + "?lat=" + ciudad.coordenadas.latitude + "&lon=" + ciudad.coordenadas.longitude + "&units=metric&appid=" + API_KEY_WEATHER;
        axios.get(url)
            .then(response => {
                setMostrarLoading(false);
                console.log('getting data from axios', response.data);
                const weather = response.data.weather;
                console.log(weather);
                if (size(weather) > 0 ) {
                    const weatherIconUrl = "http://openweathermap.org/img/w/" + weather[0].icon + ".png";
                    setIconUrl(weatherIconUrl);
                    setClima(response.data);
                } else {
                    console.log("errorrrrrr");
                }
            })
            .catch(error => {
                setMostrarLoading(false);
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            toastRef.current.show("API KEY INVALIDA. Ver https://openweathermap.org" );
                            break;
                        default:
                            toastRef.current.show("Erros status " + error.response.status + ". Ver https://openweathermap.org" );
                            break;        
                    }
                } else {
                    toastRef.current.show("Error realizando peticion al servidor. No hubo respuesta...");
                }
                console.log(error);
        });
    };

    useEffect(() => {
        console.log("ejecutando peticion a la api...");
        getClimaCiudad();
    }, [])

    return (
        <View>
            {iconUrl ? (
                <View style={styles.viewImage}>
                <Image  
                    resizeMode ="cover"
                    source={
                        iconUrl 
                        ? { uri: iconUrl }
                        : require("../../../assets/img/no-image.png")
                    }
                    style={styles.image}
                />
            </View>
            ) : null}

            <Divider style={styles.divider} />

            {clima ? (
                <View style={styles.contenedorInfo} >
                <View style={styles.viewTemperatura}>
                    <Text style={styles.climaItemTitulo} >Temperatura: </Text>
                    <Text style={styles.climaItemValor} >{clima  ? clima.main.temp : ""}</Text>
                </View>
                <View style={styles.viewValorUltimo}>
                    <Text style={styles.climaItemTitulo} >Humedad: </Text>
                    <Text style={styles.climaItemValor} >{clima  ? clima.main.humidity : ""}%</Text>
                </View>
            </View>
            ) : null}

            <View style={styles.viewMapa} >
                <MyMaps 
                    location={ciudad.coordenadas}
                    name={ciudad.nombre}
                    height={100}
                />
            </View>

            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={mostrarLoading} text="Consultando clima..." />
        </View>
    )
}

const styles = StyleSheet.create({
    viewImage: {
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200
    },
    viewTemperatura: {
        flexDirection: "row",
        marginLeft: 25,
    },
    viewValorUltimo: {
        flexDirection: "row",
        marginLeft: 25,
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    viewMapa: {
        margin: 15,
    },
    climaItemValor: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 5
    },
    climaItemTitulo: {
        fontSize: 20
    },
    contenedorInfo: {
        backgroundColor: "#FAF1E6",
        marginLeft:15 ,
        marginRight: 15,
        paddingTop:10,
        paddingBottom: 10
    },
    divider: {
        backgroundColor: "#00a680",
        marginRight:40,
        marginLeft: 40
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    button: {
        backgroundColor: '#4830D3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,
        borderRadius: 4,
        marginTop: 30,
      },
    buttonText: {
        color: '#fff',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
})
