import { useRouter } from "expo-router";
import { Button, View, Text} from "react-native";

export default function CompaniesScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Companies Screen</Text>
      <Button
        title="Go to Company"
        onPress={() => router.push("/(auth)/companies/company")}
      />
    </View>
  );
}