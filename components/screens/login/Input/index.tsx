import InputErrorMessage from "@/components/InputErrorMessage";
import { Palette } from "@/utils/constants/Colors";
import IconName from "@/utils/types/IconName";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { TextInputProps } from "react-native";
import { StyledInput, StyledInputContainer } from "./Input.styles";

type InputProps = {
  iconName: IconName;
  error?: string;
} & TextInputProps;

export default function Input({ iconName, error, ...rest }: InputProps) {
  return (
    <>
      {!!error && <InputErrorMessage text={error} />}
      <StyledInputContainer error={!!error}>
        <StyledInput {...rest} />
        <MaterialIcons name={iconName} size={26} color={Palette.marineBlue} />
      </StyledInputContainer>
    </>
  );
}
