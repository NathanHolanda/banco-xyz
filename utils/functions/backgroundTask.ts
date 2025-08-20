import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toast } from "toastify-react-native";

const STORAGE_KEY = "scheduledRequests";

export const schedulePostRequest = async (
  bodyData: any,
  endpoint: string,
  scheduledDate: string
) => {
  const requestId = Date.now().toString();

  const request = {
    id: requestId,
    bodyData,
    endpoint,
    scheduledDate: new Date(scheduledDate).getTime(),
  };

  const existingRequests = await getStoredRequests();
  existingRequests.push(request);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingRequests));

  return requestId;
};

export const processScheduledRequests = async () => {
  const requests = await getStoredRequests();
  const now = Date.now();

  const dueRequests = requests.filter((req: any) => req.scheduledDate <= now);
  const remainingRequests = requests.filter(
    (req: any) => req.scheduledDate > now
  );

  for (const request of dueRequests) {
    try {
      await axios.post(request.endpoint, request.bodyData);

      Toast.success("Sua transferência agendada foi realizada!");
    } catch (err) {
      Toast.error("Desculpe, ocorreu um erro com a transferência agendada!");
    }
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remainingRequests));
};

const getStoredRequests = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
