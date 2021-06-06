import React from "react";
import Slider from '@react-native-community/slider';

const GlaSlider = ({children, ...props}) => {
    return (
        <Slider {...props}>
            {children}
        </Slider>
    )
}

export default GlaSlider