import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveBackgroundColor: "lightgrey"}}>
      <Tabs.Screen name="index" options={{
          title: "Today's Habits",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }} />

        <Tabs.Screen name="streaks" options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          ),
        }} />

        <Tabs.Screen name="add_habit" options={{
          title: "Add Habit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }} />
    </Tabs>
  );
}
