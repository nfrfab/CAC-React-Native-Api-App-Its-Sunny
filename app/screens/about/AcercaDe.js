import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Linking} from 'react-native'

export default function AcercaDe() {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require('../../../assets/img/logo.png')}
            >
                <Text style={styles.text}>
                    It´s Sunny fue desarrollada en React Native utilizando Expo, en colaboración con los siguientes 
                    integrantes: {'\n'}{'\n'}
                        <Text style={styles.integrante}> 
                            Nathalie Saravia. {'\n'}
                        </Text>
                        <Text style={styles.integrante}> 
                            Franco Marelli. {'\n'}
                        </Text>
                        <Text style={styles.integrante}> 
                            Nestor Robles. {'\n'}
                        </Text>
                        <Text style={styles.integrante}> 
                            Martin Roige. {'\n'}{'\n'}
                        </Text>
                        Desarrollamos la aplicación utilizando
                        <Text onPress={() => Linking.openURL('http://google.com')}>
                            {''}(...){''}
                        </Text>
                        para maquetado y
                        <Text onPress={() => Linking.openURL('http://expo.io')}>
                            {''} Expo {''}
                        </Text>
                        para su desarrollo. {'\n'}{'\n'}
                        Esperamos les guste y la utilicen!
                </Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
      container: {
        flex:1,
        height: "100%",
        width: "100%"
      },
      backgroundImage: {
        flex: 1,
        justifyContent: 'center',        
        resizeMode: 'cover',
        
      },
      text: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: "bold",
        padding: 10
      },
      integrante: {
          fontSize: 24,
          textAlign: 'center',
          fontWeight: "bold",

      }

})
