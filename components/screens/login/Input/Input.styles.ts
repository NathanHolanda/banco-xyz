import { Palette } from "@/constants/Colors";
import styled from "styled-components/native";

export const StyledInputContainer = styled.View`
  flex-direction: row;
  border: 2px solid ${Palette.lightBlue};
  border-radius: 5px;
  background-color: ${Palette.lightGray};
  gap: 3px;
  margin-bottom: 20px;
  height: 60px;
  align-items: center;
  padding: 0 10px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  background-color: ${Palette.lightGray};
  font-size: 20px;
`;
