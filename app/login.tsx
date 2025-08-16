import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/screens/login/Input";
import SubmitButton from "@/components/screens/login/SubmitButton";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <ContentWrapper>
      <View style={{ marginBottom: 20 }}>
        <Input iconName="person" placeholder="E-mail" />
        <Input iconName="lock" placeholder="Senha" />
      </View>
      <SubmitButton onPress={() => router.replace("/home")} />
    </ContentWrapper>
  );
}
