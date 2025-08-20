import TransfersHistory from "@/app/transfersHistory";
import Transfer from "@/utils/types/Transfer";
import { render, screen, waitFor } from "@testing-library/react-native";
import axios from "axios";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValueOnce({
  data: {
    transfers: [
      {
        currency: "BRL",
        date: "2025-08-20",
        payee: {
          document: "12345678910",
          name: "John Doe 1",
        },
        userId: 1,
        value: 200,
      },
      {
        currency: "USD",
        date: "2025-08-19",
        payee: {
          document: "12345678911",
          name: "John Doe 2",
        },
        userId: 2,
        value: 400,
      },
      {
        currency: "EUR",
        date: "2025-08-18",
        payee: {
          document: "12345678912",
          name: "John Doe 3",
        },
        userId: 3,
        value: 600,
      },
    ] as Transfer[],
  },
});

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

describe("TransfersHistory", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockError.mockClear();
  });

  test("Should render transfers cards", async () => {
    render(<TransfersHistory />);

    await waitFor(async () => {
      expect(mockedAxios.get).toHaveBeenCalled();

      const transferCards = await screen.findAllByTestId("transfer-card");

      expect(transferCards).toHaveLength(3);
    });
  });
});
