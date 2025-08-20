import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import styled from "styled-components/native";

export const OverlayContainer = styled.View`
  background-color: #0005;
  flex: 1;
`;

export const ModalContent = styled.View`
  padding: ${ContentPadding}px;
  background-color: ${Palette.white};
  margin-top: auto;
`;

export const ModalContentHeader = styled.View`
  flex-direction: row;
  gap: ${ContentPadding}px;
  margin-bottom: ${ContentPadding}px;
`;

export const ModalContentHeaderTitle = styled.Text`
  color: ${Palette.black};
  font-size: 24px;
  font-family: "Roboto-Bold";
  margin-bottom: ${ContentPadding}px;
  flex: 1;
`;
