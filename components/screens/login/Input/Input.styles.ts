import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import styled from "styled-components/native";

type StyledInputContainerProps = { error?: boolean };
export const StyledInputContainer = styled.View<StyledInputContainerProps>`
  flex-direction: row;
  border: 2px solid
    ${({ error }) => (error ? Palette.errorRed : Palette.lightBlue)};
  border-radius: 5px;
  background-color: ${Palette.lightGray};
  gap: 3px;
  margin-bottom: ${ContentPadding}px;
  height: 60px;
  align-items: center;
  padding: 0 10px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
  font-family: Roboto;
  color: ${Palette.black};
`;
