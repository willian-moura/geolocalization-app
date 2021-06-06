import React from "react";
import { Marker } from "react-native-maps";

const GlaMarker = ({children, ...props}) => {
    return (
        <Marker {...props}>
            {children}
        </Marker>
    )
}

export default GlaMarker