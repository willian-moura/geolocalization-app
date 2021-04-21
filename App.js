import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  IconButton,
  Button,
} from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const INITIAL_REGION = {
    latitude: -22.226386218797444,
    longitude: -54.81178745627403,
    latitudeDelta: 0.08,
    longitudeDelta: 0.0121,
  };
  const INITIAL_SIGHT_COORD = {
    longitude: INITIAL_REGION.longitude,
    latitude: INITIAL_REGION.latitude,
  };

  const [isSight, setIsSight] = useState(false);
  const [sightCoord, setSightCoord] = useState(INITIAL_SIGHT_COORD);

  const [markers, setMarkers] = useState([]);

  const tootleSight = () => setIsSight(!isSight);

  const onPressMap = () => {};

  const onPressAddMarker = () => {
    tootleSight();
  };

  const onPressConfirmMarker = () => {
    if (isSight) {
      const newMarkers = markers;
      newMarkers.push(sightCoord);
      setMarkers(newMarkers);
    }
  };

  const onChangeRegion = ({ latitude, longitude }) => {
    setSightCoord({
      latitude,
      longitude,
    });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={MapView.PROVIDER_GOOGLE}
          onPress={onPressMap}
          onRegionChange={onChangeRegion}
          initialRegion={INITIAL_REGION}
          mapType="standard"
        >
          {markers.map((marker, index) => (
            <Marker
              key={`maker-${index}`}
              coordinate={{
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude),
              }}
            ></Marker>
          ))}
        </MapView>
        {isSight && (
          <View style={styles.sight}>
            <View style={styles.sightY} />
            <View style={styles.sightX} />
            <View style={styles.confirmCoord}>
              <IconButton
                icon="map-marker"
                color="red"
                size={72}
                onPress={onPressConfirmMarker}
              />
            </View>
          </View>
        )}
        <View style={styles.footer}>
          <Button
            icon={isSight ? "close" : "map-marker"}
            mode="contained"
            onPress={onPressAddMarker}
          >
            {isSight ? "Cancelar" : "Marcador"}
          </Button>
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    borderRadius: 20,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sight: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sightY: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "black",
  },
  sightX: {
    position: "absolute",
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  confirmCoord: {
    marginBottom: 60,
  },
});
