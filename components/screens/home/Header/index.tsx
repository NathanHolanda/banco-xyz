import SvgUri from "expo-svg-uri";
import React from "react";
import {
  Avatar,
  StyledHeader,
  TopContainer,
  UserContainer,
  UserName,
  WelcomeText,
} from "./Header.styles";

export default function Header() {
  return (
    <StyledHeader>
      <TopContainer>
        <UserContainer>
          <Avatar source={require("@/assets/images/user.png")} />
          <UserName>Nathan</UserName>
        </UserContainer>
        <SvgUri source={require("@/assets/images/logo.svg")} />
      </TopContainer>
      <WelcomeText>Que bom ter você aqui!</WelcomeText>
    </StyledHeader>
  );
}
