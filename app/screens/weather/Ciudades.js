import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { size } from 'lodash';

import "../../utils/varsys.js";

import ListaCiudades from '../../components/weather/ListaCiudades.js';

export default function Ciudades(props) {
    const { navigation } = props;

    const [ciudades, setCiudades] = useState([]);
    const [ciudadesLista, setCiudadesLista] = useState([]);

    const [ciudadBusqueda, setCiudadBusqueda] = useState("");
    const [isDownloadMoreCiudades, setIsDownloadMoreCiudades] = useState(false);

    const filtrarCiudades = () => {
        if (size(ciudades) > 0 ) {
            if (ciudadBusqueda === "") {
                setCiudadesLista(ciudades);
            } else {
                console.log("ciudad filtro:");
                console.log(ciudadBusqueda);
                const ciudadesFiltradas = ciudades.filter(item => item.nombre.includes(ciudadBusqueda.toUpperCase())).map(ciudadValida => (ciudadValida));
                setCiudadesLista(ciudadesFiltradas);
            }
        } else {
            setCiudadesLista([]);
        }
    };

    const getObjecto = async (clave) => {
        try {
            const jsonValue = await AsyncStorage.getItem(clave)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e);
            return null;
        }
    }

    const cargarCiudades = async () => {
        let ciudadesTemp = await getObjecto("ciudades");
        if (ciudadesTemp) {
            setCiudades(ciudadesTemp);
        } else {
            console.log("SIN CIUDADES EN LA BD LOCAL...");
        }
    };

    useEffect(() => {
        filtrarCiudades();
    }, [ciudadBusqueda]);

    useEffect(() => {
        filtrarCiudades();
    }, [ciudades]);

    useFocusEffect(
        useCallback( () =>{
            cargarCiudades();
        }, [])
    );

    const handleLoadMore = () => {
        const resultRestaurantes = [];
        console.log("buscando mas ciudades...");
    }

    const agregarCiudad = () => {
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

            {(size(ciudadesLista)> 0) 
            ? <ListaCiudades 
                ciudades={ciudadesLista}
                handleLoadMore={handleLoadMore}
                isDownloadMoreCiudades={isDownloadMoreCiudades}
            />
            :
                <View>
                    <Text>SIN ITEMS...</Text>
                </View>
            }

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
