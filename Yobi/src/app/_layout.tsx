import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ClerkProvider, useAuth} from '@clerk/clerk-expo'
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import { fetchWorkerDetails } from '@/src/utils/fetchWorkerDetails';

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!


if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}


const InitialLayout = () => {
  const { isLoaded, isSignedIn, userId } = useAuth(); // Aqui os hooks são permitidos
  const segments = useSegments();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (!isLoaded) return;

      console.log("User loaded:", isSignedIn);

      const userRole = await SecureStore.getItemAsync("user_role");
      const inAuthGroup = segments[0] === "(auth)";

      if (isSignedIn && !inAuthGroup) {
        if (userRole === "worker") {
          // Verifica os dados do trabalhador
          try {
            if (!userId) {
              console.error("User ID is null or undefined!");
              router.replace("/(public)/auth"); // Ou outra página de fallback
              return;
            }

            const workerData = await fetchWorkerDetails(userId);

            if (workerData) {
              // Dados existem, redireciona para serviços
              router.replace("/(auth)/services");
            } else {
              // Sem dados, redireciona para formulário
              router.replace("/(public)/worker-form");
            }
          } catch (error) {
            console.error("Erro ao verificar dados do trabalhador:", error);
            alert("Houve um erro ao verificar seus dados. Tente novamente.");
          }
        } else {
          // Redireciona para outra página se não for trabalhador
          router.replace("/(auth)/stores");
        }
      } else if (!isSignedIn) {
        router.replace("/(public)/auth");
      }
    }

    redirectBasedOnRole();
  }, [isSignedIn, isLoaded, userId]); // Adicione `userId` às dependências

  return <Slot />;
};


export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Inter-Thin': require('../assets/fonts/Inter-Thin-BETA.otf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter-ExtraLight-BETA.otf'),
    'Inter-Light': require('../assets/fonts/Inter-Light-BETA.otf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
    'MontserratAlternates-Regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'MontserratAlternates-BoldItalic': require('../assets/fonts/MontserratAlternates-BoldItalic.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <InitialLayout />     
    </ClerkProvider>
  )
}
