import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

import "../../utils/varsys.js";

import ListaCiudades from '../../components/weather/ListaCiudades.js';

export default function Ciudades(props) {
    const { navigation } = props;

    const [ciudades, setCiudades] = useState([]);

    const [ciudadBusqueda, setCiudadBusqueda] = useState("");
    const [isDownloadMoreCiudades, setIsDownloadMoreCiudades] = useState(false);

    //console.log(APP_BASE_COLOR);

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

    const cargarCiudades = async () => {
        let ciudadesTemp = await getObjecto("ciudades");
        if (ciudadesTemp) {
            //ciudades = [];
            setCiudades(ciudadesTemp);

        }
    };

    useFocusEffect(
        useCallback(() =>{
            //Se buscan las ciudades favoritas...
            cargarCiudades();
        }, [])
    );

    const handleLoadMore = () => {
        const resultRestaurantes = [];
        console.log("buscando mas ciudades...");
        
    }

    const agregarCiudad = () => {
        console.log("agregando ciudad");

        navigation.navigate("agregarCiudad");
    };

    return (
        <View style={styles.viewBody} >
            <SearchBar 
                placeholder="Buscar ciudad..."
                onChangeText={(filtro) => setCiudadBusqueda(filtro)}
                value={ciudadBusqueda}
                containerStyle={styles.searchBar}
            />

            <ListaCiudades 
                ciudades={ciudades}
                handleLoadMore={handleLoadMore}
                isDownloadMoreCiudades={isDownloadMoreCiudades}
            />

            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={() =>
                    agregarCiudad()
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    searchBar: {
        marginBottom: 20
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        opacity: 0.9
    }
})
