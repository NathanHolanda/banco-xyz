import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setInAsyncStorage(key: string, value: any) {
  const json = JSON.stringify(value);

  await AsyncStorage.setItem(key, json);
}
