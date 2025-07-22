import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return (
      <Stack>
        <Stack.Screen name="auth" options={{ title: "Authentication" }} />
      </Stack>
    )
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

