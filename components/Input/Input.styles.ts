import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

type StyledInputProps = { error: boolean };
export const StyledInput = styled.TextInput<StyledInputProps>`
  border: 1px solid
    ${({ error }) => (error ? Palette.errorRed : Palette.darkBlue)};
  background-color: ${Palette.lightGray};
  padding: 12px;
  border-radius: 5px;
  font-size: 18px;
  font-family: Roboto;
  color: ${Palette.black};
`;
