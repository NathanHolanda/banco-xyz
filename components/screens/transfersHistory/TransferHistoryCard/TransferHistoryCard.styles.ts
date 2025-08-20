import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import styled from "styled-components/native";

export const StyledCard = styled.View`
  padding: ${ContentPadding}px;
  background-color: ${Palette.lightGray};
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
  border-radius: 10px;
`;

export const PayeeText = styled.Text`
  color: ${Palette.black};
  font-size: 16px;
  font-family: Roboto;
  margin-bottom: 5px;
`;

export const DataContainerRow = styled.View`
  flex-direction: row;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

export const DataItem = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

export const DataLabel = styled.Text`
  color: ${Palette.black};
  font-size: 16px;
  font-family: "Roboto-Bold";
`;

export const DataValue = styled.Text`
  color: ${Palette.black};
  font-size: 16px;
  font-family: Roboto;
`;

export const HorizontalRow = styled.View`
  margin: 15px 0;
  height: 1px;
  width: 100%;
  background-color: ${Palette.darkBlue};
`;
