import Login from "@/app/login";
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

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const mockError = jest.fn();
const mockSuccess = jest.fn();
jest.mock("toastify-react-native", () => ({
  Toast: { error: mockError, success: mockSuccess },
}));

const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Successfully submits login form with valid credentials", async () => {
    const mockUserData = { id: 1, name: "Gabriel", email: "gabriel@topaz.com" };

    mockedAxios.post.mockResolvedValueOnce({
      data: { user: mockUserData },
    });

    render(<Login />);

    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.changeText(emailInput, "gabriel@topaz.com");
    fireEvent.changeText(passwordInput, "1111");

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/login", {
        email: "gabriel@topaz.com",
        password: "1111",
      });
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/home");
    });
  });

  test("Form fails to submit because of invalid password", async () => {
    render(<Login />);

    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.changeText(emailInput, "gabriel@topaz.com");
    fireEvent.changeText(passwordInput, "11");

    fireEvent.press(submitButton);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  test("Form fails to submit because of invalid e-mail", async () => {
    render(<Login />);

    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.changeText(emailInput, "gabriel");
    fireEvent.changeText(passwordInput, "1111");

    fireEvent.press(submitButton);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
