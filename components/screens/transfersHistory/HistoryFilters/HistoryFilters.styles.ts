import { Palette } from "@/utils/constants/Colors";
import styled from "styled-components/native";

export const FilterButton = styled.TouchableOpacity`
  background-color: ${Palette.lightGray};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const FilterButtonText = styled.Text`
  color: ${Palette.black};
  font-size: 20px;
  font-family: "Roboto-SemiBold";
`;

export const CleanFilterButton = styled.TouchableOpacity`
  background-color: ${Palette.lightGray};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const CleanFilterButtonText = styled.Text`
  color: ${Palette.black};
  font-size: 20px;
  font-family: "Roboto-SemiBold";
`;
