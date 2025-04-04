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
    <View style={{ backgroundColor: '#0a0908', width: '90%', borderRadius: 10, height: 100, alignSelf: 'center' }}>
      <Text style={{ color: '#fffcf2', fontWeight: 'bold', fontSize: 28, marginLeft: 5 }}>Bateria</Text>

      <Text style={{ color: '#fffcf2', marginLeft: 5 }}>
        Poziom baterii:{" "}
        <Text style={{ fontWeight: 'bold' }}>
          {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : "Ładowanie..."}
        </Text>
      </Text>

      <Text style={{ color: '#fffcf2', marginLeft: 5 }}>
        Stan baterii:{" "}
        <Text style={{ fontWeight: 'bold', color: getStatusColor(batteryStatusText) }}>
          {batteryStatusText}
        </Text>
      </Text>
    </View>
  );
};

export default BatteryStatus;
