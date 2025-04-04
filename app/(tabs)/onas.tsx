import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const onas = () => {
  return (
    <View>
      <View>
        <Text className="text-center text-black font-bold text-4xl mt-5">
          O nas
        </Text>
      </View>
      <View className="flex flex-col justify-between items-center h-3xl">
        <Link className="text-2xl" href="https://github.com/Aleksy27">
          Aleksander Piotrowski
        </Link>
        <Link className="text-2xl" href="https://github.com/SzymonWegrzynek">
          Szymon Węgrzynek
        </Link>
        <Link className="text-2xl" href="https://github.com/Kajakkkkkk">
          Kajetan Deja
        </Link>
      </View>
    </View>
  );
};

export default onas;

const styles = StyleSheet.create({});
