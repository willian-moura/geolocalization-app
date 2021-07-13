import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Math } from '_utils'

import {
    GlaButton,
    GlaIconButton,
    GlaSlider
} from "_atoms";

const GlaFooter = ({
    markers,
    setMarkers,
    sightCoord,
    getCurrentPosition,
    isSight,
    setIsSight
}) => {
  const VARIATION = 0.005

  const [markerQuantity, setMarkerQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

    const tootleSight = () => setIsSight(!isSight);

    const onPressAddMarker = () => {
        tootleSight();
    }

    const onPressConfirmMarker = () => {
      setLoading(true)

      if(!isSight){
        return
      }

      const newMarkers = markers;
      const markerCoord = {...sightCoord}

      if(markerQuantity === 1){
        newMarkers.push({...markerCoord})
      }

      if(markerQuantity > 1){
        for(let i = 1; i <= markerQuantity; i++){
          const latitude_delta = Math.getRandomArbitrary(VARIATION * -1, VARIATION)
          const longitude_delta = Math.getRandomArbitrary(VARIATION * -1, VARIATION)
          markerCoord.latitude = markerCoord.latitude + latitude_delta
          markerCoord.longitude = markerCoord.longitude + longitude_delta
          newMarkers.push({...markerCoord})
        }
      }

      setMarkers(newMarkers);

      setLoading(false)
    }

    const onPressStreetMarker = () => {
        const centerCoord = {...sightCoord}
    }

    const onMarkerQuantityChange = (value) => {
        setMarkerQuantity(value)
    }

    return (
        <View style={styles.footer}>

            {/*{isSight && <View style={styles.footerTop}>
                <Text style={{color: 'black'}}>
                    {markerQuantity}
                </Text>
                <GlaSlider
                    value={markerQuantity}
                    onValueChange={onMarkerQuantityChange}
                    style={{width: '80%', height: 40}}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#6200ee"
                />
            </View>}*/}


            {isSight &&
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: "column",
                marginBottom: 10
            }}
            >
                <GlaButton
                    icon="plus"
                    mode="contained"
                    onPress={onPressStreetMarker}
                    loading={loading}
                    disabled={loading}
                >
                    Trecho de rua
                </GlaButton>
            </View>}

            <View style={styles.footerBottom}>
                {isSight && <GlaButton
                    icon="plus"
                    mode="contained"
                    onPress={onPressConfirmMarker}
                    loading={loading}
                    disabled={loading}
                >
                    Marcador
                </GlaButton>}

                <GlaButton
                    icon={isSight ? "close" : "map-marker"}
                    mode={isSight ? "outlined" : "contained"}
                    onPress={onPressAddMarker}
                >
                    {isSight ? "Cancelar" : "Marcador"}
                </GlaButton>

                {!isSight && <GlaIconButton
                    style={{position: "absolute", right: 10}}
                    icon="crosshairs-gps"
                    onPress={getCurrentPosition}
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 32,
        borderRadius: 20,
        width: '100%',
        height: 80,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    footerTop: {
        width: '100%',
        marginBottom: 10,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    footerBottom: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});

export default GlaFooter
