import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  }

  return <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }} >
      <Text style = {styles.headerText}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>

      <TextInput
        label="Email"
        placeholder="example@gmail.com" 
        autoCapitalize="none" 
        keyboardType="email-address" 
        mode="outlined"
        style={styles.emailInput}
       />

      <TextInput
        label="Password"
        placeholder="your password" 
        autoCapitalize="none" 
        keyboardType="email-address" 
        mode="outlined"
        style={styles.passwordInput}
      />

      <Button mode="contained" style={styles.button}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
      <Button mode="text" onPress={toggleAuthMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
    </View>
  </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emailInput: {
    marginBottom: 10,
  },
  passwordInput: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});