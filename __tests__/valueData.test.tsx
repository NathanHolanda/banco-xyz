import ValueData from "@/app/makeTransfer/valueData";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve()),
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
jest.mock("toastify-react-native", () => ({
  Toast: {
    success: jest.fn(),
    error: mockError,
  },
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
  useLocalSearchParams: jest.fn().mockReturnValue({
    payee: JSON.stringify({
      name: "João Silva",
      document: "123.456.789-01",
    }),
  }),
}));

describe("ValueData Form", () => {
  test("Should not navigate to next screen because of empty fields", async () => {
    render(<ValueData />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(expect(mockPush).not.toHaveBeenCalled());
    });
  });

  test("Should not navigate to next screen because of insufficient balance", async () => {
    render(<ValueData />);
    const currencySelect = screen.getByTestId("select-currency");
    const valueInput = screen.getByTestId("input-value");

    fireEvent.press(currencySelect);
    fireEvent.changeText(valueInput, "2000,00");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);
    await waitFor(() => {
      expect(expect(mockPush).not.toHaveBeenCalled());
    });
  });
});
