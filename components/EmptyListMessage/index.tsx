import { Palette } from "@/utils/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Container, MessageText } from "./EmptyListMessage.styles";

type Props = {
  text?: string;
};

export default function EmptyListMessage({ text }: Props) {
  return (
    <Container>
      <MessageText>{text ?? "Nenhum resultado encontrado."}</MessageText>
      <MaterialIcons name="hide-source" color={Palette.black} size={40} />
    </Container>
  );
}
