import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const StyledInput = styled.TextInput`
  border: 1px solid ${Palette.darkBlue};
  background-color: ${Palette.lightGray};
  padding: 12px;
  border-radius: 5px;
  font-size: 18px;
  font-family: Roboto;
  color: ${Palette.black};
`;
