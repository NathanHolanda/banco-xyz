import Header from "@/components/Header";
import { Palette } from "@/utils/constants/Colors";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
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
