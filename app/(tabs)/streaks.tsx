import { useAuth } from "@/lib/auth_context";
import { StyleSheet, View } from "react-native";

export default function Streaks() {
  const {signOut} = useAuth();
  return (
    <View style={styles.view}>
      
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