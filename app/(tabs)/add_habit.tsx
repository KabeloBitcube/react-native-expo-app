import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth_context";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Monthly"];
type Frequency = (typeof FREQUENCY_OPTIONS)[number];

export default function AddHabit() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState<Frequency>("daily");
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (!user) return;

        try {
            await database.createDocument(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                ID.unique(),
                {
                    user_id: user.$id,
                    title,
                    description,
                    frequency,
                    streak_count: 0,
                    last_completed: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                }
            );
            router.replace('/');
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to add habit");
        }

    }

    return (
        <View style={styles.view}>
            <TextInput label="Title" mode="outlined" onChangeText={setTitle} />
            <TextInput label="Description" mode="outlined" multiline numberOfLines={4} style={{ marginBottom: 10 }} onChangeText={setDescription} />
            <SegmentedButtons style={{ marginBottom: 20 }}
                value={frequency} onValueChange={(value) => setFrequency(value as Frequency)}
                buttons={FREQUENCY_OPTIONS.map((frequency) => ({
                    value: frequency,
                    label: frequency.charAt(0).toUpperCase() + frequency.slice(1),
                }))} />

            <Button mode="contained" disabled={!title || !description} onPress={handleSubmit}>Add Habit</Button>

            {error && <Text style={{ color: theme.colors.error, marginTop: 10 }}>{error}</Text>}
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
});