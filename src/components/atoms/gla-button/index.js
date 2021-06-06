import React from "react";
import { Button } from "react-native-paper";

const GlaButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            { children }
        </Button>
    )
}

export default GlaButton