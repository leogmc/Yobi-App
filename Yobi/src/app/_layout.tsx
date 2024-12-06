import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ClerkProvider, useAuth} from '@clerk/clerk-expo'
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import { fetchWorkerDetails } from '@/src/utils/fetchWorkerDetails';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";

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
  const { isLoaded, isSignedIn, userId } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (!isLoaded) return;

      console.log("User loaded:", isSignedIn);

      const inAuthGroup = segments[0] === "(auth)";

      if (isSignedIn && !inAuthGroup) {
        if (!userId) {
          console.error("User ID is null or undefined!");
          router.replace("/(public)/auth"); // Ou outra página de fallback
          return;
        }

        try {
          console.log("Entrou no try-catch");

          // Buscar os detalhes do usuário do Firestore
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);

          // Buscar os detalhes do trabalhador do Firestore
          const workerDocRef = doc(db, "workers", userId);
          const workerDocSnap = await getDoc(workerDocRef);

          const userData = userDocSnap.data();
          console.log("User data fetched:", userData?.role);

          const workerData = workerDocSnap.data();
          console.log("Worker data fetched:", workerData?.role);

          if (userData?.role === "common") {
            // Redirecionar para a rota "/(auth)/stores" se o papel for "common"
            router.replace("/(auth)/stores");
            return;

          } else if (workerData?.role === "worker") {
            // Verificar os dados do trabalhador
            const workerDetails = await fetchWorkerDetails(userId);
            console.log("Dados do trabalhador carregados do firebase: ", workerDetails)

            if (workerDetails) {
              // Dados do trabalhador existem, redirecionar para serviços
              router.replace("/(auth)/services");
            } else {
              // Sem dados, redirecionar para o formulário
              router.replace("/(public)/worker-form");
            }
          } else {
            console.log("Ocorreu um erro. O que foi carregado da role: ", workerData);
          }
        } catch (error) {
          console.error("Erro ao buscar ou processar dados do usuário:", error);
          alert("Houve um erro ao verificar seus dados. Tente novamente.");
        }
      } else if (!isSignedIn) {
        console.log("Entrou no ultimo else...")
        router.replace("/(public)/auth");
      }
    }

    redirectBasedOnRole();
  }, [isSignedIn, isLoaded, userId]);

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
