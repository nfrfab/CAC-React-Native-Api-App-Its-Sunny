import React, { useState, useEffect, useLayoutEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import Toast from "react-native-easy-toast";
import axios from 'axios';

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
            
            <View style={styles.viewTemperatura}>
                <Text style={styles.climaItemTitulo} >Temperatura: </Text>
                <Text style={styles.climaItemValor} >{clima  ? clima.main.temp : ""}</Text>
            </View>
            <View style={styles.viewTemperatura}>
                <Text style={styles.climaItemTitulo} >Humedad: </Text>
                <Text style={styles.climaItemValor} >{clima  ? clima.main.humidity : ""}%</Text>
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
        marginLeft: 25
    },
    climaItemValor: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 5
    },
    climaItemTitulo: {
        fontSize: 20
    }
})
