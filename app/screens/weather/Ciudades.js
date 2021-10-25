import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";

import "../../utils/varsys.js";

import ListaCiudades from '../../components/weather/ListaCiudades.js';

export default function Ciudades(props) {
    const { navigation } = props;

    const [ciudades, setCiudades] = useState([]);
    console.log(ciudades);

    const [ciudadBusqueda, setCiudadBusqueda] = useState("");
    const [isDownloadMoreCiudades, setIsDownloadMoreCiudades] = useState(false);

    //console.log(APP_BASE_COLOR);

    useFocusEffect(
        useCallback(() =>{
            //Se buscan las ciudades favoritas...
            const arrayCiudades = [];

            const coordenadas = {
                latitude: -34.61360009718764,
                longitude: -58.38182123377919,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            };

            const ciudad1 = {
                id: "a1",
                nombre: "Mar del plata",
                provincia: "Buenos aires",
                pais: "Argentina",
                coordenadas: coordenadas
            };
            arrayCiudades.push(ciudad1);
            setCiudades(arrayCiudades);

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
