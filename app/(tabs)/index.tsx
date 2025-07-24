import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth_context";
import { Habit } from "@/types/databases.type";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Divider, IconButton, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>();

  useFocusEffect(
    useCallback(() => {
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

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await database.deleteDocument(DATABASE_ID, HABITS_COLLECTION_ID, habitId);
      console.log("Habit deleted:", habitId);
      setHabits((prevHabits) => prevHabits?.filter(habit => habit.$id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text variant="titleMedium">{habit.title}</Text>
            <Text variant="bodyMedium">{habit.description}</Text>
            <Text variant="bodySmall">{habit.frequency}</Text>
            {/* <Text variant="bodySmall">Streak: {habit.streak_count}</Text> */}
            {/* <Text variant="bodySmall">Last Completed: {habit.last_completed}</Text> */}
            <View style={{ flexDirection: "row" }}>
              <IconButton size={20} icon="delete" onPress={() => handleDeleteHabit(habit.$id)}></IconButton>
              <IconButton size={20} icon="square-edit-outline" onPress={() => handleDeleteHabit(habit.$id)}></IconButton>
            </View>
            <Divider style={styles.divider}></Divider>
          </ScrollView>
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