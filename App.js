import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
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
  const [region, setRegion] = useState();

  const tootleSight = () => setIsSight(!isSight);

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
    setRegion(null);
  };

  const getCurrentPosition = async () => {

    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ops!", "Permissão de acesso a localização negada.");
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.8,
        longitudeDelta: 0.121,
      };

      setRegion(newRegion);
    } catch (error) {
      alert(error)
    }



  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={MapView.PROVIDER_GOOGLE}
          onRegionChange={onChangeRegion}
          initialRegion={region}
          region={region}
          mapType="standard"
          showsUserLocation={true}
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
          <Button
            mode="contained"
            onPress={getCurrentPosition}
          >
            Minha localização
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
    width: '100%',
    height: 56,
    flexDirection: "row",
    justifyContent: "space-around",
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
