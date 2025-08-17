import { Palette } from "@/utils/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import SvgUri from "expo-svg-uri";
import React from "react";
import { BackButton, StyledHeader } from "./Header.styles";

export default function Header() {
  const router = useRouter();

  const backAction = () => router.back();

  return (
    <StyledHeader>
      <BackButton onPress={backAction}>
        <MaterialIcons name="chevron-left" color={Palette.white} size={48} />
      </BackButton>
      <SvgUri source={require("@/assets/images/logo.svg")} />
    </StyledHeader>
  );
}
