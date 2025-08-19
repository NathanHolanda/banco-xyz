import React from "react";
import { StyledText } from "./InputErrorMessage.styles";

type InputErrorMessageProps = {
  text: string;
};

export default function InputErrorMessage({ text }: InputErrorMessageProps) {
  return <StyledText>{text}</StyledText>;
}
