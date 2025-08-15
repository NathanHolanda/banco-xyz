import SvgUri from "expo-svg-uri";
import React from "react";
import { StyledHeader } from "./Header.styles";

export default function Header() {
  return (
    <StyledHeader>
      <SvgUri
        source={require("@/assets/images/logo.svg")}
        height={250}
        width={250}
      />
    </StyledHeader>
  );
}
