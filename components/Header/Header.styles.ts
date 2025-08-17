import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import styled from "styled-components/native";

export const StyledHeader = styled.View`
  background-color: ${Palette.darkBlue};
  height: 95px;
  padding: ${ContentPadding}px;
  justify-content: space-between;
  flex-direction: row;
  padding: 40px 15px 15px 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  justify-content: center;
  height: 100%;
  width: 60px;
`;
