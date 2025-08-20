import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const MessageText = styled.Text`
  font-size: 20px;
  color: ${Palette.black};
  font-family: Roboto;
`;
