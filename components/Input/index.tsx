import React from "react";
import { TextInputProps } from "react-native";
import { StyledInput } from "./Input.styles";

export default function Input({ ...rest }: TextInputProps) {
  return <StyledInput {...rest} />;
}
