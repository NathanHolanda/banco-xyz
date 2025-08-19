import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getFromAsyncStorage(key: string) {
  const json = await AsyncStorage.getItem(key);

  if (json) return JSON.parse(json);
  return null;
}
