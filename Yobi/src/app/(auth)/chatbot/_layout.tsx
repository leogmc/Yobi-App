import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Chatbot() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chatbot" }} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="user/[id]" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: 'User',
                title: 'overview',
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      
    </Stack>
  );
}
