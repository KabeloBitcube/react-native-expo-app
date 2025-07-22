import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    return (
        <View style={styles.view}>
            <Text>Logged In</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});