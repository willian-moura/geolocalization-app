import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
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

    const [markers, setMarkers] = useState([]);
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

    useEffect(() => {
        getCurrentPosition();
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
