import { Stack } from "expo-router";

export default function Stores() {
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
