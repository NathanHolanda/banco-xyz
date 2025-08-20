import { render, screen } from "@testing-library/react-native";
import React from "react";
import Home from "../app/home";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("toastify-react-native", () => ({
  Toast: { error: jest.fn(), success: jest.fn() },
}));

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        balance: {
          accountBalance: 1250.5,
          currency: "BRL",
        },
      },
    })
  ),
}));

jest.mock("@/store", () => ({
  store: {
    getState: () => ({
      user: { id: "123" },
      balance: 1250.5,
    }),
  },
  actions: {
    setBalance: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

describe("Home", () => {
  test("Should display the balance value", async () => {
    render(<Home />);

    expect(screen.getByText("Saldo")).toBeTruthy();

    expect(screen.getByText("R$")).toBeTruthy();

    expect(screen.getByText("1.250,50")).toBeTruthy();
  });
});
