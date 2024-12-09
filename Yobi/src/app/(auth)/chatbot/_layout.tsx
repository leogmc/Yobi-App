import { Stack } from "expo-router";
import React from "react";

export default function Chatbot() {
  return (
    <Stack
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: "#f2f2f2" },
      headerTintColor: "#34495E",
      headerShadowVisible: false,
      headerTitle: "",
      headerBackTitle: "Voltar",
     
    }}
  />
      
    
  );
}
