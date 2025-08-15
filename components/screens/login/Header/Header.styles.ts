import { Palette } from "@/constants/Colors";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const windowHeight = Dimensions.get("window").height;

export const StyledHeader = styled.View`
  background-color: ${Palette.darkBlue};
  height: ${windowHeight * 0.5}px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;
