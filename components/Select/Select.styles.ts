import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

type SelectTriggerProps = { error?: boolean };
export const SelectTrigger = styled.TouchableOpacity<SelectTriggerProps>`
  border: 1px solid
    ${({ error }) => (error ? Palette.errorRed : Palette.darkBlue)};
  background-color: ${Palette.lightGray};
  padding: 12px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type SelectTextProps = { isPlaceholderText?: boolean };
export const SelectText = styled.Text<SelectTextProps>`
  font-size: 18px;
  font-family: Roboto;
  color: ${({ isPlaceholderText }) =>
    isPlaceholderText ? Palette.placeholder : Palette.black};
`;

export const ItemText = styled.Text`
  color: ${Palette.black};
  font-size: 20px;
  font-family: Roboto;
  padding-vertical: 10px;
  border-color: ${Palette.lightBlue};
  border-bottom-width: 1px;
`;
