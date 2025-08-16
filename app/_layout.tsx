import HomeHeader from "@/components/screens/home/Header";
import LoginHeader from "@/components/screens/login/Header";
import { Palette } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
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
          <Stack.Screen
            name="home"
            options={{
              header: HomeHeader,
            }}
          />
          <Stack.Screen name="makeTransfer" />
          <Stack.Screen name="transfersHistory" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
