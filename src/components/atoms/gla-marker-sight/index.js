import React from "react";
import {StyleSheet, View} from "react-native";

const GlaMarkerSight = () => {
    return (
        <View style={styles.sight}>
            <View style={styles.sightY}/>
            <View style={styles.sightX}/>
        </View>
    )
}

const styles = StyleSheet.create({
    sight: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    sightY: {
        position: "absolute",
        width: 1,
        height: 300,
        backgroundColor: "black",
    },
    sightX: {
        position: "absolute",
        height: 1,
        width: 300,
        backgroundColor: "black",
    }
});

export default GlaMarkerSight
