import { makeServer } from "@/api/miragejs";
import Header from "@/components/Header";
import HomeHeader from "@/components/screens/home/Header";
import LoginHeader from "@/components/screens/login/Header";
import { store } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import ToastManager from "toastify-react-native";

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

  makeServer();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: Palette.white,
              },
              header: Header,
            }}
            initialRouteName="loading"
          >
            <Stack.Screen name="loading" options={{ headerShown: false }} />
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
            <Stack.Screen
              name="makeTransfer"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="transfersHistory" />
          </Stack>
          <ToastManager />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
