import { Text, View } from "react-native";
import React from "react";

const network = () => {
  return (
    <View className="bg-[#0a0908] w-full rounded-[10px] h-[100px] self-center p-2">
      <Text className="text-[#fffcf2] font-bold text-[28px] ml-1">Sieć</Text>
      <Text className="text-[#fffcf2] ml-1">
        Status połączenia: <Text className="font-bold">Połączone z Wi-Fi</Text>
      </Text>
    </View>
  );
};

export default network;
