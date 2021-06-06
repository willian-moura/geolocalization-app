import React from "react";
import {  Provider as PaperProvider } from "react-native-paper";
import {Home} from "_scenes"
import {StatusBar} from "expo-status-bar";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto"/>
      <Home />
    </PaperProvider>
  );
}
