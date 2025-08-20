import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import PayeeData from "../app/makeTransfer/payeeData";

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

jest.mock("toastify-react-native", () => ({
  Toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("PayeeData Form", () => {
  test("Should not navigate to next screen because of short name", async () => {
    render(<PayeeData />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("Should not navigate to next screen because of short name", async () => {
    render(<PayeeData />);

    const nameInput = screen.getByTestId("name-input");
    fireEvent.changeText(nameInput, "João");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("Should not navigate to next screen because invalid CPF format", async () => {
    render(<PayeeData />);

    const nameInput = screen.getByTestId("name-input");
    const cpfInput = screen.getByTestId("document-input");

    fireEvent.changeText(nameInput, "João Silva");
    fireEvent.changeText(cpfInput, "12345678901");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("Should submit successfully with valid data", async () => {
    render(<PayeeData />);

    const nameInput = screen.getByTestId("name-input");
    const cpfInput = screen.getByTestId("document-input");

    fireEvent.changeText(nameInput, "João Silva");
    fireEvent.changeText(cpfInput, "123.456.789-01");

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: "/makeTransfer/valueData",
        params: {
          payee: JSON.stringify({
            name: "João Silva",
            document: "12345678901",
          }),
        },
      });
    });
  });
});
