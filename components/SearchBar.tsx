import React from "react";
import { View, TextInput, Button } from "react-native";
import { SearchBarProps } from "@/interfaces/interfaces";

const SearchBar = ({ onPress, value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row justify-between items-center p-2 rounded-xl w-full bg-[#222]">
      <TextInput
        className="text-white p-2 w-fit"
        placeholder="Wpisz miasto..."
        value={value}
        onChangeText={onChangeText}
      />
      <Button color="white" title="Szukaj" onPress={onPress} />
    </View>
  );
};

export default SearchBar;
