import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const About = () => {
    return (
    <>
        <View>
            <Text className="text-center text-black font-bold text-4xl mt-5">O nas</Text>
        </View>
        <View className="flex flex-col justify-between items-center h-3xl">            
            <Link className="text-2xl" href="https://github.com/Aleksy27">Aleksander Piotrowski</Link>
            <Link className="text-2xl" href="https://github.com/SzymonWegrzynek">Szymon Węgrzynek</Link>
            <Link className="text-2xl" href="https://github.com/Kajakkkkkk">Kajetan Deja</Link>
        </View>
    </>        
    );
};

export default About;