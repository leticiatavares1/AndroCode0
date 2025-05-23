import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

SplashScreen.preventAutoHideAsync(); // evitar auto-hide antes da inicialização

export default function App() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await SplashScreen.hideAsync();

      if (user) {
        router.replace("/Home");
      } else {
        router.replace("/screens/Login");
      }
    });

    return unsubscribe;
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Carregando...</Text>
    </View>
    );
  }
}
