import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const TitleContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: "Roboto-Bold";
  color: ${Palette.darkBlue};
  flex: 1;
`;

export const SubTextContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-top: 5px;
`;

export const SubText = styled.Text`
  font-size: 16px;
  font-family: Roboto;
  color: ${Palette.darkBlue};
  flex: 1;
`;
