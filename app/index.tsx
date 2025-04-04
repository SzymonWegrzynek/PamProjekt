import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-primary font-bold">Witamy!</Text>
      <Link className="text-2xl" href="/battery">Bateria</Link>
      <Link className="text-2xl" href="/about">O nas</Link>
      <StatusBar style="dark" />
    </View>
  );
}
