import { Palette } from "@/constants/Colors";
import styled from "styled-components/native";

export const StyledBalanceCard = styled.View`
  background-color: ${Palette.lightGray};
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
  border-radius: 10px;
  padding: 20px 20px 30px 20px;
  gap: 10px;
`;

export const BalanceLabel = styled.Text`
  font-family: Roboto;
  font-size: 20px;
  color: ${Palette.black};
`;

export const BalanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const BalanceAmountContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  flex: 1;
`;

export const CurrencySymbolText = styled.Text`
  font-family: "Roboto-Bold";
  font-size: 32px;
  color: ${Palette.darkBlue};
`;

export const BalanceAmountText = styled.Text`
  font-family: Roboto;
  font-size: 32px;
  color: ${Palette.black};
  width: 80%;
`;
