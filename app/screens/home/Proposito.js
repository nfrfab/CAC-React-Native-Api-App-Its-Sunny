import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Slider} from "./Slider"


const fondo = [{img: require('../../../assets/img/mapa1.jpg'),
                texto: "Bienvenido a It´sSunny, tu reporte del clima de tus ciudades y lugares favoritos"},
               {img: require('../../../assets/img/mapa2.jpg'),
                texto: "Ten siempre a mano el reporte del clima de tus lugares de interés al momento"},
               {img: require('../../../assets/img/mapa3.jpg'), 
                texto: "Comienza ya! Agrega nuevas ciudades o verifica el clima de tus lugares favoritos"}];

export default function Proposito() {
    return (
        <View style={styles.home}>
            <Slider images={fondo} /> 
        </View>
    )
}
const styles = StyleSheet.create({
    home : {
       flex: 1,
       backgroundColor: "white"        
    }
})
