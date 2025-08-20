import { actions, store } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import CurrencySymbols from "@/utils/constants/CurrencySymbols";
import { processScheduledRequests } from "@/utils/functions/backgroundTask";
import formatNumberToCurrency from "@/utils/functions/formatNumberToCurrency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const [isBalanceVisible, setBalanceVisible] = useState(false);

  const { user, balance } = store.getState();

  const [value, setValue] = useState<string>();
  const [currency, setCurrency] = useState<string>();

  const fetchBalanceAmount = useCallback(async () => {
    try {
      const {
        data: {
          balance: { accountBalance, currency },
        },
      } = await axios.get(`/api/balance/${user.id}`);

      dispatch(actions.setBalance(accountBalance));
      setCurrency(CurrencySymbols[currency as keyof typeof CurrencySymbols]);
    } catch (err) {
      setCurrency("R$");
      setValue("0,00");
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    processScheduledRequests().then(async () => {
      await fetchBalanceAmount();
    });
  }, []);

  useEffect(() => {
    if (balance > 0) {
      const money = formatNumberToCurrency(balance);

      const currency = money.split(/\s/)[0];
      const value = money.split(/\s/)[1];

      setCurrency(currency);
      setValue(value);
    }
  }, [balance]);

  return (
    <StyledBalanceCard>
      <BalanceLabel>Saldo</BalanceLabel>
      <BalanceContainer>
        <BalanceAmountContainer>
          <CurrencySymbolText>{currency}</CurrencySymbolText>
          <BalanceAmountText testID="balance-value">
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
