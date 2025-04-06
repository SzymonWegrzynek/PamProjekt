import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

const onas = () => {
  return (
    <View className="flex-1 bg-[#000] pt-20">
      <Text className="text-white text-3xl font-bold text-center">O nas</Text>
      <View className="flex-1 justify-center items-center gap-2">
        <Link
          className="text-white text-2xl font-medium"
          href="https://github.com/Aleksy27"
        >
          Aleksander Piotrowski
        </Link>
        <Link
          className="text-white text-2xl font-medium"
          href="https://github.com/SzymonWegrzynek"
        >
          Szymon Węgrzynek
        </Link>
        <Link
          className="text-white text-2xl font-medium"
          href="https://github.com/Kajakkkkkk"
        >
          Kajetan Deja
        </Link>
      </View>
    </View>
  );
};

export default onas;
