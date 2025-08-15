import LoginHeader from "@/components/screens/login/Header";
import { Palette } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Palette.white,
            },
          }}
        >
          <Stack.Screen
            name="login"
            options={{
              header: LoginHeader,
            }}
          />
          <Stack.Screen name="home" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
