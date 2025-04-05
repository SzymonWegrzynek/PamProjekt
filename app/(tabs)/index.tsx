import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold text-center">Witamy!</Text>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-medium">
          Zapraszamy do zapoznania się z naszym projektem zaliczeniowym na PAM
        </Text>
      </View>
    </View>
  );
};

export default Index;
