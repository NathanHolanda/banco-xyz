import { store } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import formatNumberToCurrency from "@/utils/functions/formatNumberToCurrency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  BalanceAmountContainer,
  BalanceAmountText,
  BalanceContainer,
  BalanceLabel,
  CurrencySymbolText,
  StyledBalanceCard,
} from "./BalanceCard.styles";

const hiddenBalanceText = "••••••";

export default function BalanceCard() {
  const [isBalanceVisible, setBalanceVisible] = useState(false);

  const user = store.getState().user;

  const [value, setValue] = useState<string>();
  const [currency, setCurrency] = useState<string>();

  const fetchBalanceAmount = async () => {
    try {
      const {
        data: { balance },
      } = await axios.get(`/api/balance/${user.id}`);

      const money = formatNumberToCurrency(
        balance.accountBalance,
        balance.currency
      );

      const currency = money.split(/\s/)[0];
      const value = money.split(/\s/)[1];

      setValue(value);
      setCurrency(currency);
    } catch (err) {
      setCurrency("R$");
      setValue("0,00");
    }
  };

  useEffect(() => {
    fetchBalanceAmount();
  }, []);

  return (
    <StyledBalanceCard>
      <BalanceLabel>Saldo</BalanceLabel>
      <BalanceContainer>
        <BalanceAmountContainer>
          <CurrencySymbolText>{currency}</CurrencySymbolText>
          <BalanceAmountText>
            {isBalanceVisible ? hiddenBalanceText : value}
          </BalanceAmountText>
        </BalanceAmountContainer>
        <TouchableOpacity onPress={() => setBalanceVisible(!isBalanceVisible)}>
          <MaterialIcons
            name={isBalanceVisible ? "visibility-off" : "visibility"}
            size={32}
            color={Palette.darkBlue}
          />
        </TouchableOpacity>
      </BalanceContainer>
    </StyledBalanceCard>
  );
}
