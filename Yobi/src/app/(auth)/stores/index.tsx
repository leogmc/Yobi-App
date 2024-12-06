import { useRouter } from "expo-router";
import { Button, View, Text} from "react-native";

export default function StoresScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Stores Screen</Text>
      <Button
        title="Go to Store"
        onPress={() => router.push("/(auth)/stores/store")}
      />
    </View>
  );
}
