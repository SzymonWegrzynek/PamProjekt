import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useFetch from "@/services/useFetch";
import { fetchNetwork } from "@/services/networkApi";

const NetworkInfo = () => {
  const { data, loading, error, refetch } = useFetch(
    () => fetchNetwork(),
    false
  );

  useEffect(() => {
    refetch();
  }, []);

  const ip = data?.ip;
  const publicIp = data?.publicIp;
  const network = data?.network;
  const airplaneMode = data?.airplaneMode;

  return (
    <View className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Sieć
      </Text>
      <View className="flex flex-row flex-wrap justify-between gap-4">
        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Adres IP:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {ip ?? "Wczytywanie"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Publiczne IP:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {publicIp ?? "Wczytywanie"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Połączony:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network?.isConnected ? (
              <Text className="text-green-700">Tak</Text>
            ) : (
              <Text className="text-red-700">Nie</Text>
            )}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Typ połączenia:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network ? (
              <Text className="text-blue-700">{network?.type}</Text>
            ) : (
              "Nieznany"
            )}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Dostęp do sieci:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {network?.isInternetReachable === true
              ? "Tak"
              : network?.isInternetReachable === false
              ? "Nie"
              : "Wczytywanie"}
          </Text>
        </View>

        <View className="bg-[#222] rounded-xl p-4 w-full">
          <Text className="text-white text-lg">Tryb samolotowy:</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {airplaneMode === null
              ? "Nie obsługiwane"
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
