import React from "react";
import { TextInputProps, View } from "react-native";
import InputErrorMessage from "../InputErrorMessage";
import { StyledInput } from "./Input.styles";

type InputProps = {
  error?: string;
} & TextInputProps;
export default function Input({ error, ...rest }: InputProps) {
  return (
    <View>
      {!!error && <InputErrorMessage text={error} />}
      <StyledInput error={!!error} {...rest} />
    </View>
  );
}
