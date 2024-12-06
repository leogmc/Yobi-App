import { useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import * as SecureStore from 'expo-secure-store'

function LogoutButton(){
  const {signOut} = useAuth();

  function logout(){
    signOut();

  }
  
  return(
    <Pressable onPress={logout}>
      <Feather name="log-out" size={24} color="#FFF"/>
    </Pressable>
  )
}


export default function AuthLayout() {

  const {isSignedIn} = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle:{
          backgroundColor: "#121212"
        },
        headerTintColor: "#FFF",
        headerRight: () => <LogoutButton/>,
        tabBarStyle: { backgroundColor: "#574545" },
      }}
    >
      <Tabs.Screen
        name="chatbot"
        options={{
          headerTitle: "Chatbot",
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="stores"
        options={{
          headerTitle: "Lojas",
          tabBarLabel: "Lojas",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="services"
        options={{
          headerTitle: "Serviços",
          tabBarLabel: "Serviços",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="companies"
        options={{
          headerTitle: "Sustentabilidade",
          tabBarLabel: "Descarte",
          tabBarIcon: ({ color, size }) => (
            <Feather name="truck" color={color} size={size} />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}


