import { Palette } from "@/constants/Colors";
import { ContentPadding } from "@/constants/DefaultMeasures";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - (ContentPadding + ContentPadding / 2);

export const StyledCard = styled.View`
  width: ${cardWidth}px;
  padding: ${ContentPadding}px;
  background-color: ${Palette.lightGray};
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
  border-radius: 10px;
`;

export const CardButton = styled.TouchableOpacity`
  align-items: center;
  gap: 15px;
`;

export const ItemCardText = styled.Text`
  font-family: "Roboto-Bold";
  color: ${Palette.darkBlue};
  font-size: 20px;
  text-align: center;
`;
