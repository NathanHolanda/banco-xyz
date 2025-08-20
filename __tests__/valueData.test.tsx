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
const mockToast = {
  success: jest.fn(),
  error: mockError,
};
jest.mock("toastify-react-native", () => ({
  Toast: mockToast,
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: jest.fn().mockReturnValue({
    payee: JSON.stringify({
      name: "João Silva",
      document: "123.456.789-01",
    }),
  }),
}));

describe("ValueData Form", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockError.mockClear();
  });

  test("Should not navigate to next screen because of empty fields", async () => {
    render(<ValueData />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("Should not navigate to next screen because of insufficient balance", async () => {
    render(<ValueData />);
    const currencySelect = screen.getByTestId("select-currency");
    const valueInput = screen.getByTestId("input-value");

    fireEvent.press(currencySelect);
    await waitFor(async () => {
      const option = await screen.findAllByTestId("option");
      expect(option[0]).toBeOnTheScreen();
      fireEvent(option[0], "press");
    });

    fireEvent.changeText(valueInput, "2000,00");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("Should navigate to next screen successfully", async () => {
    render(<ValueData />);
    const currencySelect = screen.getByTestId("select-currency");
    const valueInput = screen.getByTestId("input-value");

    fireEvent.press(currencySelect);
    await waitFor(async () => {
      const option = await screen.findAllByTestId("option");
      expect(option[0]).toBeOnTheScreen();
      fireEvent(option[0], "press");
    });

    fireEvent.changeText(valueInput, "200,00");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });
});
