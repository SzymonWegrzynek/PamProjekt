import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View className="bg-[#000] flex-1 pt-20">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Witamy!
        </Text>
        <Text className="text-white text-xl text-justify font-medium px-5">
          Zapraszamy do zapoznania się z naszym projektem zaliczeniowym na pam.
          Jako zespół - Szymon, Olek, Kajetan - stworzyliśmy aplikacje mobilną w
          react native przy użyciu biblioteki expo. Apliakcja oferuje trzy
          główne funkcjonalności: bateria - podgląd poziomu i stanu naładowania
          wraz z logami i powiadomieniami, sieć - najwazniejsze informacje o
          aktualnym stanie połączenia oraz pogoda - jako dodatkową
          funkcjonalność wykonalismy sprawdznie prognozy pogody dla wybranego
          miasta.
        </Text>
      </View>
    </View>
  );
};

export default Index;
