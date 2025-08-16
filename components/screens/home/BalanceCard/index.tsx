import { Palette } from "@/utils/constants/Colors";
import formatNumberToCurrency from "@/utils/functions/formatNumberToCurrency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
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

type BalanceCardProps = {
  balance: number;
};

export default function BalanceCard({ balance }: BalanceCardProps) {
  const money = formatNumberToCurrency(balance, "BRL");
  const currency = money.split(/\s/)[0];
  const value = money.split(/\s/)[1];

  const [isBalanceVisible, setBalanceVisible] = useState(false);

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
