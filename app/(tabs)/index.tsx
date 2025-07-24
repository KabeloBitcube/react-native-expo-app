import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth_context";
import { Habit } from "@/types/databases.type";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Divider, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>();

  useFocusEffect (
    useCallback (() => {
      if (!user) {
        router.replace("/auth");
      } else {
        fetchHabits();
      }
    }, [])
  );

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
      <Button icon="account-arrow-left" onPress={async () => {
        await signOut();
        router.replace("/auth");
      }}>Sign Out</Button>



      {habits?.length === 0 ? (
        <Text variant="bodyLarge">No habits found. Start by creating one!</Text>
      ) : (habits?.map((habit) => (
        <View key={habit.$id}>
          <Text variant="titleMedium">{habit.title}</Text>
          <Text variant="bodyMedium">{habit.description}</Text>
          <Text variant="bodySmall">{habit.frequency}</Text>
          {/* <Text variant="bodySmall">Streak: {habit.streak_count}</Text> */}
          {/* <Text variant="bodySmall">Last Completed: {habit.last_completed}</Text> */}
          <Divider style={styles.divider}></Divider>
        </View>
      ))
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 8,
    margin: 16,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#ccc",
    height: 1,

  }
});