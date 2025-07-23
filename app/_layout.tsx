import { AuthProvider, useAuth } from "@/lib/auth_context";
import { Stack } from "expo-router";

function AppStack() {
  const { user } = useAuth();
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

