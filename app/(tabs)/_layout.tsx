import { Tabs } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { ICONS } from "@/constants/icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Główna",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name={ICONS.home} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="battery"
        options={{
          title: "Bateria",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? ICONS.batteryFull : ICONS.batteryHalf}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: "Sieć",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={ICONS.wifi} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: "Pogoda",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={ICONS.sunny} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="onas"
        options={{
          title: "O nas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={ICONS.info} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
