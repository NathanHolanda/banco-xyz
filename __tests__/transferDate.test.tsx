import TransferDate from "@/app/makeTransfer/transferDate";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import axios from "axios";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock("@/store", () => ({
  store: {
    getState: () => ({
      user: { id: "123" },
      balance: 1000,
    }),
  },
  actions: {
    setBalance: jest.fn(),
  },
}));

const mockError = jest.fn();

const mockToast = {
  success: jest.fn(),
  error: mockError,
};
jest.mock("toastify-react-native", () => ({
  Toast: mockToast,
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
  useLocalSearchParams: jest.fn().mockReturnValue({
    payee: JSON.stringify({
      name: "João Silva",
      document: "12345678901",
    }),
    value: JSON.stringify({
      currency: "BRL",
      value: 200,
    }),
  }),
}));

describe("TransferDate Form", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockError.mockClear();
  });

  test("Should send transfer request successfully", async () => {
    render(<TransferDate />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });
});
