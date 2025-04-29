import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useBatteryLevel, useBatteryState, BatteryState } from "expo-battery";
import * as Battery from "expo-battery";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BatteryStatus = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  const getBatteryStatus = () => {
    if (batteryLevel === null || batteryState === null) return "Wczytywanie";
    if (batteryLevel >= 0.99) return "Bateria naładowana";
    if (batteryState === BatteryState.CHARGING) return "Ładowanie";
    return "Wyładowywanie";
  };

  const batteryStatus = getBatteryStatus();

  const getCurrentLogs = async () => {
    return JSON.parse((await AsyncStorage.getItem("batteryLogs")) || "[]");
  };

  const saveLog = async (entry: string) => {
    const currentLogs = await getCurrentLogs();
    const updated = [entry, ...currentLogs].slice(0, 10);
    await AsyncStorage.setItem("batteryLogs", JSON.stringify(updated));
    setLogs(updated);
  };

  const loadLogs = async () => {
    const saved = await getCurrentLogs();
    setLogs(saved);
  };

  useEffect(() => {
    loadLogs();

    const chargingListener = Battery.addBatteryStateListener(
      (event: Battery.BatteryStateEvent) => {
        const state = event.batteryState;
        let status = "Nieznany";
        if (state === BatteryState.CHARGING) status = "Podłączono ładowarkę";
        if (state === BatteryState.UNPLUGGED) status = "Odłączono ładowarkę";
        if (state === BatteryState.FULL) status = "Bateria naładowana";

        const logEntry = `${new Date().toLocaleString()} - ${status}`;
        saveLog(logEntry);
      }
    );

    return () => chargingListener.remove();
  }, []);

  return (
    <View className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Bateria
      </Text>

      {batteryLevel !== null && batteryLevel < 0.2 && (
        <View className="bg-red-700 mb-4 p-3 rounded-xl ">
          <Text className="text-white text-center font-semibold text-base">
            Bateria jest bliska rozładowania
          </Text>
        </View>
      )}

      {batteryLevel !== null && batteryLevel >= 0.9 && (
        <View className="bg-green-700 mb-4 p-3 rounded-xl">
          <Text className="text-white text-center font-semibold text-base">
            Bateria prawie pełna
          </Text>
        </View>
      )}

      <View className="flex flex-row flex-wrap justify-between gap-4">
        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Poziom baterii</Text>
          <Text className="text-white text-2xl font-bold text-center mt-1">
            {batteryLevel !== null
              ? `${(batteryLevel * 100).toFixed()}%`
              : "?%"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Stan baterii</Text>
          <Text
            className={`text-2xl font-bold mt-1 ${
              batteryStatus === "Ładowanie"
                ? "text-green-700"
                : batteryStatus === "Wyładowywanie"
                ? "text-red-700"
                : batteryStatus === "Bateria naładowana"
                ? "text-green-700"
                : "text-white"
            }`}
          >
            {batteryStatus}
          </Text>
        </View>
      </View>

      <View className="bg-[#222] rounded-xl p-4 w-full mt-4">
        <Text className="text-white text-lg">Historia ładowania</Text>
        {logs.map((log, index) => (
          <Text key={index} className="text-white text-base font-semibold mt-1">
            {log}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default BatteryStatus;
