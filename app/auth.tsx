import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function AuthScreen() {
  return <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={{ flex: 1 }}>
    <View>
        <Text>Create Account</Text>
    </View>
  </KeyboardAvoidingView>
}