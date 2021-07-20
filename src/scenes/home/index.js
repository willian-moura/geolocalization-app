import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import { GlaMapView, GlaMapMarker, GlaMarkerSight } from "_atoms";
import { GlaFooter } from "_molecules"
import * as Location from "expo-location";
import CornersJSON from '_documentation/corners_dourados'

export default function Home() {
    const DELTAS = {
        latitude: 0.10,
        longitude: 0.0121,
    };

    const [isSight, setIsSight] = useState(false);
    const [sightCoord, setSightCoord] = useState();

    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState();

    const [cornersList, setCornersList] = useState([])
    const [corners, setCorners] = useState([])

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

    const getCornersList = () => {
        console.log('getting corners list')
        const {features} = CornersJSON
        const list = features.map(item => ({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
        }))
        console.log('finished')
        setCornersList(list)
    }

    const onChangeRegion = (region) => {
        setSightCoord({
          latitude: region.latitude,
          longitude: region.longitude
        })
        setRegion(null);
    };

    useEffect(() => {
        getCurrentPosition();
        getCornersList();
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
                {corners.map((marker, index) => (
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
                corners={corners}
                setCorners={setCorners}
                cornersList={cornersList}
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
