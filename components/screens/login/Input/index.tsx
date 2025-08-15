import { Palette } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { TextInputProps } from "react-native";
import { StyledInput, StyledInputContainer } from "./Input.styles";

type InputProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
} & TextInputProps;

export default function Input({ iconName, ...rest }: InputProps) {
  return (
    <StyledInputContainer>
      <StyledInput {...rest} />
      <MaterialIcons name={iconName} size={26} color={Palette.marineBlue} />
    </StyledInputContainer>
  );
}
