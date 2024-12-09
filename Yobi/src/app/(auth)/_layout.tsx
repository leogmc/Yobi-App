import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Button } from "./styles";

function LogoutButton() {
  const { signOut } = useAuth();

  function logout() {
    signOut();
  }

  return (
    <Pressable onPress={logout}>
      <Button>
        <FontAwesome name="sign-out" size={24} color="#EBF5FF" />
      </Button>
    </Pressable>
  );
}

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#34495E",
        },
        headerTintColor: "#EBF5FF",
        headerRight: () => <LogoutButton />,
        tabBarStyle: { backgroundColor: "#34495E" },
        tabBarActiveTintColor: "#34495E", // Cor do ícone ativo
        tabBarInactiveTintColor: "#EBF5FF", // Cor do ícone inativo
        tabBarActiveBackgroundColor: "#EBF5FF", // Background da aba ativa
        tabBarInactiveBackgroundColor: "#34495E", // Background da aba inativa
      }}
    >
      <Tabs.Screen
        name="chatbot"
        options={{
          headerTitle: "Chatbot",
          tabBarLabel: "Chatbot",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" color={color} size={size} />
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
            <FontAwesome6 name="store" color={color} size={size} />
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
            <FontAwesome6 name="handshake-simple" color={color} size={size} />
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
            <FontAwesome name="leaf" color={color} size={size} />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
