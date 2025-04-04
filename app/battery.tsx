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

    if (batteryLevel >= 0.99) return " Pełna bateria";
    if (batteryState === BatteryState.CHARGING) return " Ładowanie";
    return "Rozładowywanie";
  };

  return (
    <View >
      <Text >
        Poziom baterii:{" "}
        {batteryLevel !== null
          ? `${(batteryLevel * 100).toFixed(0)}%`
          : "Ładowanie..."}
      </Text>
      <Text>Stan baterii: {getBatteryStatusText()}</Text>
    </View>
  );
};


export default BatteryStatus;
