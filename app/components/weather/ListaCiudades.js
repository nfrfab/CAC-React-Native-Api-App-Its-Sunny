//rnfs  <- para crear de forma rapida la funcion...
import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'react-native-elements';
import { size } from 'lodash';
import { useNavigation } from "@react-navigation/native";

export default function ListaCiudades(props) {
    const { ciudades, handleLoadMore, isDownloadMoreCiudades, onOpcionesItem } = props;

    const navigation = useNavigation();
    
    return (
        <View>
            { size(ciudades) > 0 ? (
                <FlatList 
                    data={ciudades}
                    renderItem={(ciudad) => <CiudadItem  ciudad={ciudad} onOpcionesItem={onOpcionesItem}  navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<FooterList  isDownloadMoreCiudades={isDownloadMoreCiudades} />}
                />
            ) : (
                <View style={styles.loaderCiudades}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Cargando ciudades...</Text>
                </View>
            )}
        </View>
    )
}

function FooterList(props) {
    const { isDownloadMoreCiudades } = props;
    if (isDownloadMoreCiudades) {
        return(
            <View style={styles.loaderCiudades}>
                <ActivityIndicator color="#0000ff" />
            </View>
        );
    } else {
        return(
            <View style={styles.notFoundMoreCiudades}>
                <Text>Fin de lista....</Text>
            </View>
        );
    }
}

function CiudadItem(props) {
    const { ciudad, onOpcionesItem, navigation } = props;
    const { id, nombre, provincia, pais } = ciudad.item;

    const onItemSelected = () => {
        const ciudadElegida = JSON.stringify(ciudad.item);
        navigation.navigate("climaCiudad", {
            ciudadElegida: ciudadElegida,
            idCiudad: id,
            nombreCiudad: nombre
        });
    };

    return(
        <TouchableOpacity onPress={onItemSelected} onLongPress={() => onOpcionesItem(ciudad)} >
            <View style={styles.ciudadItemStyle}>
 
                <View>
                    <Text style={styles.ciudadNombre} >{nombre}</Text>
                    <Text style={styles.ciudadProvincia} >{provincia}</Text>
                    <Text style={styles.ciudadPais} >{pais} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loaderCiudades: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    ciudadItemStyle: {
        flexDirection: "row",
        margin: 10,
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    ciudadItemImagenStyle: {
        marginRight: 15,

    },
    image: {
        width: 80,
        height: 80
    },
    ciudadNombre: {
        fontWeight: "bold"
    },
    ciudadProvincia: {
        paddingTop: 2,
        color: "grey"
    },
    ciudadPais: {
        paddingTop:2,
        color: "grey",
        width: 300
    },
    notFoundMoreCiudades: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }

})
