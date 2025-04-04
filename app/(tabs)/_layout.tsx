import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="battery"
        options={{ title: "Battery", headerShown: false }}
      />
      <Tabs.Screen
        name="network"
        options={{ title: "Network", headerShown: false }}
      />
      <Tabs.Screen
        name="onas"
        options={{ title: "O nas", headerShown: false }}
      />
    </Tabs>
  );
};

export default _layout;
