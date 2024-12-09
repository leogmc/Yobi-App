import {Stack} from "expo-router";

export default function PublicLayout() {

  return (
    <Stack
        screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="user-register"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="worker-register"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="worker-form"
        options={{
          headerShown: false
        }}
      />

    </Stack>
  );
}


