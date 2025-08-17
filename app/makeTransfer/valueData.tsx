import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/Input";
import ScreenTitle from "@/components/ScreenTitle";
import Select from "@/components/Select";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

export default function PayeeData() {
  const router = useRouter();

  const params = useLocalSearchParams<{ payee: string }>();
  const { payee } = params;

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Insira o valor"
      />
      <Formik
        initialValues={{ currency: "", value: "" }}
        onSubmit={(values) => {
          router.push({
            pathname: "/makeTransfer/transferDate",
            params: {
              payee,
              value: JSON.stringify(values),
            },
          });
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <Select
                title="Selecione a moeda"
                options={["BRL", "USD", "EUR"]}
                onSelect={(value) => setFieldValue("currency", value)}
                placeholder="Selecionar moeda"
              />
              <Input
                onChangeText={handleChange("value")}
                value={values.value}
                placeholder="Valor da transferência"
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
