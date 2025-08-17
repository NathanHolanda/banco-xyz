import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const DatePickerTrigger = styled.TouchableOpacity`
  border: 1px solid ${Palette.darkBlue};
  background-color: ${Palette.lightGray};
  padding: 12px;
  border-radius: 5px;
  font-size: 18px;
  font-family: Roboto;
  color: ${Palette.black};
  flex-direction: row;
  justify-content: space-between;
`;

type DatePickerTextProps = { isPlaceholderText?: boolean };
export const DatePickerText = styled.Text<DatePickerTextProps>`
  font-size: 18px;
  font-family: Roboto;
  color: ${({ isPlaceholderText }) =>
    isPlaceholderText ? Palette.placeholder : Palette.black};
`;
