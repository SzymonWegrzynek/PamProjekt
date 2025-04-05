import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text } from "react-native";
import { useBatteryLevel, useBatteryState, BatteryState } from "expo-battery";
import * as Battery from "expo-battery";

const BatteryStatus = () => {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();
  const [logs, setLogs] = useState<string[]>([]);

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

  const saveLog = async (entry: string) => {
    const currentLogs = JSON.parse(
      (await AsyncStorage.getItem("batteryLogs")) || "[]"
    );
    const updated = [entry, ...currentLogs].slice(0, 30);
    await AsyncStorage.setItem("batteryLogs", JSON.stringify(updated));
    setLogs(updated);
  };

  const loadLogs = async () => {
    const saved = JSON.parse(
      (await AsyncStorage.getItem("batteryLogs")) || "[]"
    );
    setLogs(saved);
  };

  useEffect(() => {
    loadLogs();

    const chargingListener = Battery.addBatteryStateListener(
      (event: Battery.BatteryStateEvent) => {
        const state = event.batteryState;
        let status = "Nieznany";
        if (state === BatteryState.CHARGING) status = "Podłączono do ładowarki";
        if (state === BatteryState.UNPLUGGED) status = "Odłączono od ładowarki";
        if (state === BatteryState.FULL) status = "Bateria pełna";

        const logEntry = `${new Date().toLocaleString()} - ${status}`;
        saveLog(logEntry);
      }
    );

    return () => chargingListener.remove();
  }, []);

  return (
    <>
      <View>
        <Text className="text-center text-black font-bold text-4xl mt-20 font-lexend">
          Bateria
        </Text>
      </View>
      <View className="flex flex-row justify-center gap-2 mt-5">
        <View className="flex flex-col bg-[#0a0908] w-[30%] rounded-xl h-24 self-center py-2">
          <Text className="text-[#fffcf2] text-center">Poziom baterii</Text>
          <Text className="font-bold text-center text-[#fffcf2] text-5xl mt-3">
            {batteryLevel !== null
              ? `${(batteryLevel * 100).toFixed(0)}%`
              : "Ładowanie..."}
          </Text>
        </View>
        <View className="flex flex-col bg-[#0a0908] w-[60%] rounded-xl h-24 self-center py-2">
          <Text className="ml-2 text-[#fffcf2]">Stan baterii</Text>
          <Text
            className="font-bold ml-2 text-4xl mt-3"
            style={{ color: getStatusColor(batteryStatusText) }}
          >
            {batteryStatusText}
          </Text>
        </View>
      </View>

      <ScrollView className="">
        <Text className="text-center">Logi ładowania</Text>
        {logs.map((log, index) => (
          <Text key={index} className="text-center">
            {log}
          </Text>
        ))}
      </ScrollView>
    </>
  );
};

export default BatteryStatus;
