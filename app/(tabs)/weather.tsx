import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "@/components/SearchBar";
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

  return (
    <ScrollView className="p-4 bg-[#000] h-full pt-20">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Pogoda
      </Text>

      <View className="flex flex-row flex-wrap justify-between gap-4">
        <SearchBar
          value={city}
          onChangeText={setCity}
          onPress={() => {
            refetch();
            saveSearch(city);
          }}
        />

        {weather && (
          <View className="bg-[#222] w-full rounded-xl">
            <Text className="text-[#fff] text-center text-3xl font-semibold p-5">
              {city}
            </Text>
            <View className="self-center h-[1px] bg-[#fff] w-full" />
            <View>
              <View className="p-5 gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Temperatura
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.temp_c}°C
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Wilgotność
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.humidity}%
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[#fff] text-center text-xl font-medium">
                    Wiatr
                  </Text>
                  <Text className="font-semibold text-center text-3xl text-[#fff]">
                    {weather.wind_kph} km/h
                  </Text>
                </View>
              </View>

              <View className="self-center h-[1px] bg-[#fff] w-full" />

              <View className="flex-row items-center justify-between p-5">
                <Text className="text-[#fff] text-center text-xl font-medium">
                  Opis
                </Text>
                <Text className="font-semibold text-center text-3xl text-[#fff]">
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
                  className="text-white text-lg mt-1 font-medium"
                >
                  {weekday.charAt(0).toUpperCase() + weekday.slice(1)}:{" "}
                  {day.day.avgtemp_c}°C, {day.day.condition.text}
                </Text>
              );
            })}
          </View>
        )}

        <View className="bg-[#222] rounded-xl p-4 w-full flex-row flex-wrap">
          <Text className="text-white text-lg mb-1">
            Ostatnio wyszukiwane:{" "}
          </Text>
          {searchHistory.map((item, index) => (
            <Text
              key={index}
              onPress={() => fetchWeather(item)}
              className="text-white text-lg"
            >
              {item.trim()}
              {index < searchHistory.length - 1 ? ", " : ""}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Weather;
