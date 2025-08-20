import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  margin: auto;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const ButtonText = styled.Text`
  color: ${Palette.black};
  font-size: 16px;
  font-family: Roboto;
`;
