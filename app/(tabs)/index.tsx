import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View className="bg-[#000] flex-1 pt-20">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-3xl font-bold text-center">Witamy!</Text>
        <Text className="text-white text-xl font-medium text-center">
          Zapraszamy do zapoznania się z naszym projektem zaliczeniowym na PAM!
        </Text>
      </View>
    </View>
  );
};

export default Index;
