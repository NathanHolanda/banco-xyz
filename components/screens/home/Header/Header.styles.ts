import { Palette } from "@/constants/Colors";
import { ContentPadding } from "@/constants/DefaultMeasures";
import styled from "styled-components/native";

export const StyledHeader = styled.View`
  background-color: ${Palette.darkBlue};
  height: 200px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: ${ContentPadding}px;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserName = styled.Text`
  color: ${Palette.white};
  font-family: "Roboto-SemiBold";
  font-size: 16px;
  width: 60%;
`;

export const WelcomeText = styled.Text`
  color: ${Palette.white};
  font-family: "Roboto-Bold";
  font-size: 24px;
  margin-top: auto;
  text-align: center;
`;
