import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Overlay } from "react-native-elements";

export default function Modal(props) {
    const { isVisible, setIsVisible, children } = props;

    const cerrarModar = () => setIsVisible(false);

    return(
        <Overlay
            isVisible={isVisible}
            overlayStyle={style.overlayStyle}
            onBackdropPress={cerrarModar}
            >
            {children}
        </Overlay>
    );
}

const style = StyleSheet.create({
    overlayStyle: {
        height: "auto",
        width: "90%",
        backgroundColor: "#fff"
    },
    listItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    },

});