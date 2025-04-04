import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const About = () => {
    return (
        <View className="h-40 flex flex-col justify-between items-center">
            <Text className="font-bold color-black text-5xl mt-5">About</Text>
            <Link href="https://github.com/Aleksy27">Aleksander Piotrowski</Link>
            <Link href="https://github.com/SzymonWegrzynek">Szymon Węgrzynek</Link>
            <Link href="https://github.com/Kajakkkkkk">Kajetan Deja</Link>
        </View>
    );
};

export default About;