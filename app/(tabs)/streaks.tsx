import { StyleSheet, View } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Badge, Text } from "react-native-paper";

export default function Streaks() {
  const pieData = [{ value: 1, color: "green", text: "Complete", showText: true }, { value: 2, color: "darkorange", text: "Incomplete", showText: true }];
  const barData = [{ value: 1, frontColor: "green" }, { value: 2, frontColor: "darkorange" }];
  const noValues = pieData.every(item => item.value === 0);

  console.log("Streaks data:", pieData);
  console.log("No values:", noValues);
  console.log("Data length:", pieData.length);

  return (
    <View style={styles.view}>
      <View style={styles.piechartview}>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>
          Streaks Overview
        </Text>
        {noValues ? (
          <Text variant="bodyMedium">No data available</Text>
        ) : (
          <View>
            <PieChart data={pieData} showText textColor="white" textSize={12} radius={150} />
            <BarChart data={barData} horizontal />
          </View>
        )}
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Text variant="bodyMedium">Complete</Text>
          <Badge style={{backgroundColor:"green", marginBottom:10, marginLeft:10}}></Badge>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text variant="bodyMedium">Incomplete</Text>
          <Badge style={{backgroundColor:"darkorange", marginBottom:10, marginLeft:10}}></Badge>
        </View>
      </View>
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
  piechartview: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});