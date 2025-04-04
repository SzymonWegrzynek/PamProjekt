import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useBatteryLevel,
  useBatteryState,
  BatteryState,
} from "expo-battery";

const BatteryStatus = () => {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  const getBatteryStatusText = () => {
    if (batteryLevel === null || batteryState === null)
      return "Pobieranie danych...";

    if (batteryLevel >= 0.99) return "Pełna bateria";
    if (batteryState === BatteryState.CHARGING) return "Ładowanie";
    return "Rozładowywanie";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ładowanie":
        return "#2dc653";
      case "Rozładowywanie":
        return "red";
      case "Pełna bateria":
        return "#2dc653";
      default:
        return "#fffcf2";
    }
  };

  const batteryStatusText = getBatteryStatusText();

  return (
  <>
    <View>
      <Text className="text-center text-black font-bold text-4xl mt-5">
        Bateria
      </Text>
    </View>
  
    <View className="flex flex-row justify-center gap-2 mt-5">
      <View className="flex flex-col bg-[#0a0908] w-[30%] rounded-xl h-24 self-center py-2">
        <Text className="text-[#fffcf2] text-center">
          Poziom baterii
        </Text>
        <Text className="font-bold text-center text-[#fffcf2] text-5xl mt-3">
          {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : "Ładowanie..."}
        </Text>
      </View>

      <View className="flex flex-col bg-[#0a0908] w-[60%] rounded-xl h-24 self-center py-2">
        <Text className="ml-2 text-[#fffcf2]">
          Stan baterii
        </Text>  
        <Text className="font-bold ml-2 text-4xl mt-3" style={{ color: getStatusColor(batteryStatusText) }}>
          {batteryStatusText}
        </Text>    
      </View>
    </View>
  </>

  );
};

export default BatteryStatus;
