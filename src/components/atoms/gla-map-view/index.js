import React from "react";
import MapView from "react-native-maps";

const GlaMapView = ({children, ...props}) => {
    return (
        <MapView {...props}>
            {children}
        </MapView>
    )
}

export default GlaMapView