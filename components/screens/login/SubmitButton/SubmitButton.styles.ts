import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const StyledButton = styled.TouchableOpacity`
  background-color: ${Palette.marineBlue};
  border-radius: 20px;
  padding: 15px;
`;

export const StyledButtonText = styled.Text`
  color: ${Palette.white};
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;
