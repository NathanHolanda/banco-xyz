import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/screens/login/Input";
import SubmitButton from "@/components/screens/login/SubmitButton";
import React from "react";
import { View } from "react-native";

export default function Login() {
  return (
    <ContentWrapper>
      <View style={{ marginBottom: 20 }}>
        <Input iconName="person" placeholder="E-mail" />
        <Input iconName="lock" placeholder="Senha" />
      </View>
      <SubmitButton />
    </ContentWrapper>
  );
}
