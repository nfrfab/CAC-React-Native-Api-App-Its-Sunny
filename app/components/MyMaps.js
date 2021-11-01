import React from 'react'
import MapView, {Marker} from 'react-native-maps';
import openMaps from "react-native-open-maps";

export default function MyMaps(props) {
    const { location, name, height} = props;

    

    const openAppMaps = () => {
        console.log("abrindo maps...");
        
        openMaps({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        });
        
    };

    return (
        <MapView 
            style={{ height: height, width: "100%" }}
            initialRegion={location}
            showsUserLocation={true}
            onPress={openAppMaps}
        >
            <Marker 
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}

            />
        </MapView>
    )
}
