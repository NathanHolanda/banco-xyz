import React from "react";
import { TouchableOpacityProps } from "react-native";
import { StyledButton, StyledButtonText } from "./Button.styles";

type ButtonProps = {
  label: string;
} & TouchableOpacityProps;

export default function Button({ label, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      <StyledButtonText>{label}</StyledButtonText>
    </StyledButton>
  );
}
