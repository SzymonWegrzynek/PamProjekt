import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-primary font-bold">Welcome!</Text>
      <Link href="/battery">Battery</Link>
      <StatusBar style="dark" />
    </View>
  );
}
