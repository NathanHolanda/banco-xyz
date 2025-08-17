import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/Input";
import ScreenTitle from "@/components/ScreenTitle";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

export default function PayeeData() {
  const router = useRouter();

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Dados do beneficiário"
      />
      <Formik
        initialValues={{ name: "", document: "" }}
        onSubmit={(values) => {
          router.push({
            pathname: "/makeTransfer/valueData",
            params: {
              payee: JSON.stringify(values),
            },
          });
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <Input
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder="Nome do beneficiário"
              />
              <Input
                onChangeText={handleChange("document")}
                value={values.document}
                placeholder="CPF do beneficiário"
              />
            </View>
            <View style={{ marginTop: "auto" }}>
              <Button onPress={() => handleSubmit()} label="Próximo" />
            </View>
          </View>
        )}
      </Formik>
    </ContentWrapper>
  );
}
