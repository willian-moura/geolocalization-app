import React from "react";
import {IconButton} from "react-native-paper";

const GlaIconButton = ({children, ...props}) => {
    return (
        <IconButton {...props}>
            {children}
        </IconButton>
    )
}

export default GlaIconButton