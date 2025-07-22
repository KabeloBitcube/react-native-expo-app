import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>Hello World</Text>
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