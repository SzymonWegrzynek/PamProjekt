import React from "react";
import { View, Text } from "react-native";
import { useBatteryLevel, useBatteryState, BatteryState } from "expo-battery";

const BatteryStatus = () => {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  const getBatteryStatus = () => {
    if (batteryLevel === null || batteryState === null) return "Wczytywanie";
    if (batteryLevel >= 0.99) return "Pełna bateria";
    if (batteryState === BatteryState.CHARGING) return "Ładowanie";
    return "Wyładowywanie";
  };

  const batteryStatus = getBatteryStatus();

  return (
    <View className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Bateria
      </Text>
      <View className="flex flex-row flex-wrap justify-between gap-4">
        <View className="bg-[#222] rounded-xl p-4 w-[36%]">
          <Text className="text-white text-lg">Poziom baterii</Text>
          <Text className="text-white text-2xl font-bold text-center mt-1">
            {batteryLevel !== null
              ? `${(batteryLevel * 100).toFixed()}%`
              : "?%"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-[60%]">
          <Text className="text-white text-lg">Stan baterii</Text>
          <Text
            className={`text-2xl font-bold mt-1 ${
              batteryStatus === "Ładowanie"
                ? "text-green-500"
                : batteryStatus === "Wyładowywanie"
                ? "text-red-500"
                : batteryStatus === "Pełna bateria"
                ? "text-green-500"
                : "text-white"
            }`}
          >
            {batteryStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BatteryStatus;
