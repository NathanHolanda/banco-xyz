import React from "react";
import { TouchableOpacityProps } from "react-native";
import { StyledButton, StyledButtonText } from "./SubmitButton.styles";

export default function SubmitButton({ ...rest }: TouchableOpacityProps) {
  return (
    <StyledButton {...rest}>
      <StyledButtonText>Entrar</StyledButtonText>
    </StyledButton>
  );
}
