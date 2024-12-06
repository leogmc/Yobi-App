import { useRouter } from "expo-router";
import { Button, View, Text} from "react-native";

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Services Screen</Text>
      <Button
        title="Go to Worker profile"
        onPress={() => router.push("/(auth)/services/worker-profile")}
      />
    </View>
  );
}