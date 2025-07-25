import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth_context";
import { Habit } from "@/types/databases.type";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Badge, Button, Divider, IconButton, Modal, PaperProvider, Portal, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [isComplete, setIsComplete] = useState(false);

  const theme = useTheme();


  const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Monthly"];
  type Frequency = (typeof FREQUENCY_OPTIONS)[number];

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
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  }

  const handleUpdateHabit = async (habitId: string) => {
    setIsModalVisible(false)
    try {
      const habit = habits?.find(h => h.$id === habitId);
      if (!habit) return;

      await database.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, habitId,
        {
          title: title || habit.title,
          description: description || habit.description,
          frequency: frequency || habit.frequency,
          complete: isComplete || habit.complete,
          user_id: user?.$id
        });
      console.log("Habit updated:", habitId);
      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PaperProvider>
    <View style={styles.view}>
      <View style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <Button icon="account-arrow-left" onPress={async () => {
          await signOut();
          router.replace("/auth");
        }}>Sign Out</Button>
      </View>


      <View>
        {habits?.length === 0 ? (
          <Text variant="bodyMedium" style={{ padding: 50 }}>No habits found. Start by creating one!</Text>
        ) : (habits?.map((habit) => (
          <View key={habit.$id} style={{ backgroundColor: "#e3dce7ff", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            
              <ScrollView showsVerticalScrollIndicator={false}>
                
                <Text variant="titleMedium">{habit.title}</Text>
                <Text variant="bodyMedium">{habit.description}</Text>
                <Text variant="bodySmall">{habit.frequency}</Text>
                {/* <Text variant="bodySmall">Streak: {habit.streak_count}</Text> */}
                {/* <Text variant="bodySmall">Last Completed: {habit.last_completed}</Text> */}
                <Badge style={{ backgroundColor: isComplete ? "darkorange" : "green", fontWeight: "bold", fontSize: 15 }}>{isComplete ? "Incomplete" : "Complete"}</Badge>
                <Divider style={styles.divider}></Divider>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                  <IconButton size={20} icon="delete-outline" onPress={() => handleDeleteHabit(habit.$id)}></IconButton>
                  <IconButton size={20} icon="square-edit-outline" onPress={() => setIsModalVisible(true)}></IconButton>
                </View>
                <Portal>
                  <Modal
                    visible={isModalVisible}
                    contentContainerStyle={{ backgroundColor: "white", padding: 20, margin: 20, borderRadius: 8, minHeight: 500 }}
                    dismissable={true}
                    onDismiss={() => setIsModalVisible(false)}
                  >
                    <View style={styles.editview}>
                      <ScrollView>
                        <Text variant="titleLarge">Update Habit</Text>
                        <TextInput label="Title" mode="outlined" onChangeText={setTitle} />
                        <TextInput label="Description" mode="outlined" multiline numberOfLines={4} style={{ marginBottom: 10 }} onChangeText={setDescription} />
                        <SegmentedButtons style={{ marginBottom: 20 }}
                          value={frequency} onValueChange={(value) => setFrequency(value as Frequency)}
                          buttons={FREQUENCY_OPTIONS.map((frequency) => ({
                            value: frequency,
                            label: frequency.charAt(0).toUpperCase() + frequency.slice(1),
                          }))} />
                        <Button icon={isComplete ? "tray-remove" : "checkbox-marked-circle-outline"} mode="contained-tonal" onPress={() => setIsComplete(!isComplete)} style={{ marginBottom: 20, backgroundColor: theme.colors.background }}>
                          {isComplete ? "Mark as Incomplete" : "Mark as Complete"}
                        </Button>
                        <Button mode="contained" onPress={() => handleUpdateHabit(habit.$id)}>Save</Button>
                      </ScrollView>
                    </View>
                  </Modal>
                </Portal>
              </ScrollView>
            
          </View>
        ))
        )}
      </View>
    </View>
    </PaperProvider>
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
  editview: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#ccc",
    height: 1,

  }
});