import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveBackgroundColor: "lightgrey"}}>
      <Tabs.Screen name="index" options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      <Tabs.Screen name="login" options={{ title: "Login", tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" color={color} size={size} />
          ), }} />
    </Tabs>
  );
}
