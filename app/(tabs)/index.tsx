import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth_context";
import { Habit } from "@/types/databases.type";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id ?? "")]
      );
      console.log("Habits fetched:", response.documents);
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  return (
    <View style={styles.view}>
      <Text variant="headlineSmall">Today's Habits</Text>
      <Button onPress={async () => {
        await signOut();
        router.replace("/auth");
      }}>Sign Out</Button>



      {habits?.length === 0 ? (
        <Text variant="bodyLarge">No habits found. Start by creating one!</Text>
      ) : (habits?.map((habit) => (
        <View key={habit.$id}>
          <Text variant="titleMedium">{habit.title}</Text>
          <Text variant="bodyMedium">{habit.description}</Text>
          <Text variant="bodySmall">Frequency: {habit.frequency}</Text>
          <Text variant="bodySmall">Streak: {habit.streak_count}</Text>
          <Text variant="bodySmall">Last Completed: {habit.last_completed}</Text>
        </View>
      ))
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});