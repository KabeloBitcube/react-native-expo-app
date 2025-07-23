import { useAuth } from "@/lib/auth_context";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Streaks() {
  const {signOut} = useAuth();
  return (
    <View style={styles.view}>
      <Text>Hello World</Text>
      <Button onPress={async () => {
          await signOut();
          router.replace("/auth");
        }}>Sign Out</Button>
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