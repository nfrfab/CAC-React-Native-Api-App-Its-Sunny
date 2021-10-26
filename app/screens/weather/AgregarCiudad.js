import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from "react-native-easy-toast";

import Loading from '../../components/Loading';
import AgregarCiudadForm from '../../components/weather/AgregarCiudadForm';

export default function AgregarCiudad(props) {
    const { navigation  } = props;
    const toastRef = useRef();
    const [mostrarLoading, setMostrarLoading] = useState(false);
    const [textoLoading, setTextoLoading] = useState("Creando restaurante...");

    //console.log(toastRef);

    return (
        <View>
            <AgregarCiudadForm  toastRef={toastRef} setIsLoading={toastRef} navigation={navigation} /> 
            
            <Loading isVisible={mostrarLoading} text={textoLoading} />

            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    )
}

const styles = StyleSheet.create({})
