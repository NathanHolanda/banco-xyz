import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function removeFromAsyncStorage(key: string) {
  await AsyncStorage.removeItem(key);
}
