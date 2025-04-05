import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Network from "expo-network";

const NetworkInfo = () => {
  const [ip, setIp] = useState<string | null>(null);
  const [network, setNetwork] = useState<Network.NetworkState | null>(null);
  const [airplaneMode, setAirplaneMode] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const ip = await Network.getIpAddressAsync();
      const netState = await Network.getNetworkStateAsync();
      const airplaneMode = await Network.isAirplaneModeEnabledAsync();

      setIp(ip);
      setNetwork(netState);
      setAirplaneMode(airplaneMode);
    };

    fetchAllData();
  }, []);

  return (
    <View className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Sieć
      </Text>
      <View className="flex flex-row flex-wrap justify-between gap-4">
        <View className="bg-[#222] rounded-xl p-4 w-[53%]">
          <Text className="text-white text-lg">Adres IP:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {ip ?? "Wczytywanie"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-[43%]">
          <Text className="text-white text-lg">Typ połączenia:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network ? (
              <Text className="text-blue-500">{network?.type}</Text>
            ) : (
              "Nieznany"
            )}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-[30%]">
          <Text className="text-white text-lg">Połączony:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network?.isConnected ? (
              <Text className="text-green-500">Tak</Text>
            ) : (
              <Text className="text-red-500">Nie</Text>
            )}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-[66%]">
          <Text className="text-white text-lg">Dostęp do sieci:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network?.isInternetReachable === true
              ? "Tak"
              : network?.isInternetReachable === false
              ? "Nie"
              : "Wczytywanie"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-[100%]">
          <Text className="text-white text-lg">Tryb samolotowy:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {airplaneMode === null
              ? "Wczytywanie"
              : airplaneMode
              ? "Włączony"
              : "Wyłączony"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NetworkInfo;
