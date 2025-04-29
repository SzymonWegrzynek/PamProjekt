import axios from "axios";
import { Platform } from "react-native";
import * as Network from "expo-network";

export const fetchNetwork = async () => {
  try {
    const publicIpResponse = await axios.get(
      "https://api.ipify.org?format=json"
    );
    const publicIp = publicIpResponse.data.ip;

    const ip = await Network.getIpAddressAsync();

    const network = await Network.getNetworkStateAsync();

    let airplaneMode = null;
    if (Platform.OS === "android") {
      airplaneMode = await Network.isAirplaneModeEnabledAsync();
    }

    return { ip, publicIp, network, airplaneMode };
  } catch (error) {
    console.error("Błąd podczas pobierania informacji o sieci:", error);
    return { ip: null, publicIp: null, network: null, airplaneMode: null };
  }
};
