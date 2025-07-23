import { AuthProvider, useAuth } from "@/lib/auth_context";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

function AppStack() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
  }, [user]);

  if (loading) {
    return <LoadingComponent />; 
  }

  return (
    <Stack>
      {!user ? (
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
      <AppStack />
    </AuthProvider>
  );
}

