import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import CornersJSON from '_documentation/corners_dourados'
import {
    GlaMapView,
    GlaMapMarker,
    GlaMarkerSight
} from "_atoms";
import {
    GlaFooter
} from "_molecules"
import * as Location from "expo-location";

export default function Home() {
    const DELTAS = {
        latitude: 0.10,
        longitude: 0.0121,
    };

    const [isSight, setIsSight] = useState(false);
    const [sightCoord, setSightCoord] = useState();

    const [markers, setMarkers] = useState([
        // {
        //     latitude: -22.383589725386745,
        //     longitude: -54.514140413462918
        // },
        // {
        //     "latitude": -22.383589725386745,
        //     "longitude": -54.514140413462918
        // },
        // {
        //     "latitude": -22.383190830687372,
        //     "longitude": -54.515124644711626
        // },
        // {
        //     "latitude": -22.383190830687372,
        //     "longitude": -54.515124644711626
        // },
        // {
        //     "latitude": -22.382840369187438,
        //     "longitude": -54.513801667639335
        // },
        // {
        //     "latitude": -22.382840369187438,
        //     "longitude": -54.513801667639335
        // },
        // {
        //     "latitude": -22.383788459645892,
        //     "longitude": -54.513622041974926
        // },
        // {
        //     "latitude": -22.383788459645892,
        //     "longitude": -54.513622041974926
        // },
        // {
        //     "latitude": -22.384278825808714,
        //     "longitude": -54.514432548583663
        // },
        // {
        //     "latitude": -22.384278825808714,
        //     "longitude": -54.514432548583663
        // },
    ]);
    const [region, setRegion] = useState();

    const getCurrentPosition = async () => {

        try {
            let {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Ops!", "Permissão de acesso a localização negada.");
            }

            let {
                coords: {latitude, longitude},
            } = await Location.getCurrentPositionAsync();

            const newRegion = {
                latitude,
                longitude,
                latitudeDelta: DELTAS.latitude,
                longitudeDelta: DELTAS.longitude,
            };

            setRegion(newRegion)
            setSightCoord({
                latitude,
                longitude
            })
        } catch (error) {
            alert(error)
        }
    };

    const onChangeRegion = (region) => {
        setSightCoord({
          latitude: region.latitude,
          longitude: region.longitude
        })
        setRegion(null);
    };

    const getCorners = () => {
        const {features} = CornersJSON
        return features.map(item => ({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
        }))
    }

    useEffect(() => {
        getCurrentPosition();
        // setMarkers([...getCorners()])
    }, []);

    return (
        <View style={styles.container}>
            <GlaMapView
                style={StyleSheet.absoluteFillObject}
                provider={GlaMapView.PROVIDER_GOOGLE}
                onRegionChange={onChangeRegion}
                initialRegion={region}
                region={region}
                mapType="standard"
                showsUserLocation={true}
            >
                {markers.map((marker, index) => (
                    <GlaMapMarker
                        key={`maker-${index}`}
                        coordinate={{
                            latitude: Number(marker.latitude),
                            longitude: Number(marker.longitude),
                        }}
                    />
                ))}
            </GlaMapView>

            {isSight && <GlaMarkerSight />}

            <GlaFooter
                markers={markers}
                setMarkers={setMarkers}
                sightCoord={sightCoord}
                getCurrentPosition={getCurrentPosition}
                isSight={isSight}
                setIsSight={setIsSight}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});
