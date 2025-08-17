import Header from "@/components/Header";
import { Palette } from "@/utils/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-SemiBold": require("../../assets/fonts/Roboto-SemiBold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Palette.white,
        },
        header: Header,
        animation: "none",
      }}
    >
      <Stack.Screen name="payeeData" />
      <Stack.Screen name="transferDate" />
      <Stack.Screen name="valueData" />
    </Stack>
  );
}
