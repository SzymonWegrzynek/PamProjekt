import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData, ForecastDay } from "@/types/weather";
import useFetch from "@/services/useFetch";
import { fetchWeather } from "@/services/weatherApi";

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { data, loading, error, refetch } = useFetch(
    () => fetchWeather(city),
    false
  );

  const {
    weather,
    forecast,
  }: { weather: WeatherData | null; forecast: ForecastDay[] } = data || {
    weather: null,
    forecast: [],
  };

  const getWeatherHistory = async () => {
    return await AsyncStorage.getItem("weatherHistory");
  };

  const saveSearch = async (city: string) => {
    try {
      const history = JSON.parse((await getWeatherHistory()) || "[]");
      const updated = [
        city,
        ...history.filter((i: string) => i !== city),
      ].slice(0, 5);
      await AsyncStorage.setItem("weatherHistory", JSON.stringify(updated));
      setSearchHistory(updated);
    } catch (error) {
      console.warn("Błąd zapisu historii:", error);
    }
  };

  const loadSearchHistory = async () => {
    const history = JSON.parse((await getWeatherHistory()) || "[]");
    setSearchHistory(history);
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const searchHistoryFiltered = Array.from(
    new Set([city, ...searchHistory])
  ).filter((item) => item.trim() !== "");

  return (
    <ScrollView className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Pogoda
      </Text>

      <View className="flex flex-row flex-wrap justify-between gap-4">
        <TextInput
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => {
            refetch();
            saveSearch(city);
          }}
          className="bg-[#222] text-white rounded-xl w-full text-xl px-5 py-3 leading-[22px]"
          placeholder="Wpisz miasto..."
        />

        {weather && (
          <View className="bg-[#222] w-full rounded-xl">
            <Text className="text-[#fff] text-center text-2xl font-semibold p-5">
              {city}
            </Text>
            <View className="self-center h-[1px] bg-[#fff] w-full" />
            <View>
              <View className="p-5 gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-lg font-medium">
                    Temperatura
                  </Text>
                  <Text className="font-semibold text-center text-2xl text-[#fff]">
                    {weather.temp_c}°C
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-lg font-medium">
                    Wilgotność
                  </Text>
                  <Text className="font-semibold text-center text-2xl text-[#fff]">
                    {weather.humidity}%
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-lg font-medium">
                    Wiatr
                  </Text>
                  <Text className="font-semibold text-center text-2xl text-[#fff]">
                    {weather.wind_kph} km/h
                  </Text>
                </View>
              </View>

              <View className="self-center h-[1px] bg-[#fff] w-full" />

              <View className="flex-row items-center justify-between p-5">
                <Text className="text-[#fff] text-center text-lg font-medium">
                  Opis
                </Text>
                <Text className="font-semibold text-right text-2xl text-[#fff]">
                  {weather.condition.text}
                </Text>
              </View>
            </View>
          </View>
        )}

        {forecast.length > 0 && (
          <View className="bg-[#222] rounded-xl p-4 w-full">
            <Text className="text-white text-lg">Prognoza pogody:</Text>
            {forecast.map((day) => {
              const weekday = new Intl.DateTimeFormat("pl-PL", {
                weekday: "long",
              }).format(new Date(day.date));

              return (
                <Text
                  key={day.date}
                  className="text-white text-xl mt-2 font-medium"
                >
                  {weekday.charAt(0).toUpperCase() + weekday.slice(1)}:{" "}
                  {day.day.avgtemp_c}°C, {day.day.condition.text}
                </Text>
              );
            })}
          </View>
        )}

        <View className="bg-[#222] rounded-xl p-4 w-full flex-row flex-wrap">
          <Text className="text-white text-lg">Ostatnio wyszukiwane: </Text>
          {searchHistoryFiltered.map((item, index) => (
            <Text
              key={index}
              onPress={() => {
                refetch();
                setCity(item);
                saveSearch(item);
              }}
              className="text-white text-xl underline font-medium"
            >
              {item.trim()}
              {index < searchHistoryFiltered.length - 1 ? ", " : ""}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Weather;
