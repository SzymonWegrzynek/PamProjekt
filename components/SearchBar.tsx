import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { SearchBarProps } from "@/interfaces/interfaces";

const SearchBar = ({ onPress, value, onChangeText }: SearchBarProps) => {
  return (
    <View
      className="flex-row items-center rounded-xl w-full h-12 bg-[#222]"
      style={{ height: 48 }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="text-white px-5 flex-1"
        placeholder="Wpisz miasto..."
      />
      <Pressable onPress={onPress} className="px-5">
        <Text className="text-white">Szukaj</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;
