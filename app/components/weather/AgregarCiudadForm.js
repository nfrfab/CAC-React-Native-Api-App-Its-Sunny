import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Avatar, Image, Icon, Button} from "react-native-elements";

export default function AgregarCiudadForm(props) {
    const { toastRef, setIsLoading, navigation} = props;

    const [nombreCiudad, setNombreCiudad] = useState(null);

    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [coordenadasCiudad, setCoodenadasCiudad] = useState(null);

    return (
        <View>
            <Text>Form...</Text>
            <FormAdd setNombreCiudad={setNombreCiudad} coordenadasCiudad={coordenadasCiudad} setIsVisibleMap={setIsVisibleMap} />
        </View>
    )
}

function FormAdd(props) {
    const { setNombreCiudad, coordenadasCiudad, setIsVisibleMap } = props;

    return(
        <View style={styles.viewForm}>
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
                            setIsVisibleMap(true)
                        }
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10
    },
})
