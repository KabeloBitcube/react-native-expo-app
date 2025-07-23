import { AuthProvider, useAuth } from "@/lib/auth_context";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AppStack() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (user) {
          console.log("User is authenticated:", user);
          setLoading(false);
      } else {
          console.log("No user authenticated");
      }
  }, [user]);

  if (!user && loading) {
    return <LoadingComponent />; 
  }

  return (
    <Stack>
      {user === null ? (
        <Stack.Screen name="auth" options={{ title: "Authentication" }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export function LoadingComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AppStack />
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

