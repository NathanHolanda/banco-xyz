import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/Input";
import ScreenTitle from "@/components/ScreenTitle";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import maskCpf from "@/utils/functions/maskCpf";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

export default function PayeeData() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Nome muito curto!")
      .required("Nome obrigatório!"),
    document: Yup.string()
      .matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/, "CPF inválido!")
      .required("CPF obrigatório!"),
  });

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Dados do beneficiário"
      />
      <Formik
        initialValues={{ name: "", document: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          router.push({
            pathname: "/makeTransfer/valueData",
            params: {
              payee: JSON.stringify({
                ...values,
                document: values.document.replace(/\D/g, ""),
              }),
            },
          });
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <Input
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder="Nome do beneficiário"
                error={errors.name}
                testID="name-input"
              />
              <Input
                onChangeText={(text) =>
                  setFieldValue("document", maskCpf(text))
                }
                value={values.document}
                placeholder="CPF do beneficiário"
                error={errors.document}
                testID="document-input"
              />
            </View>
            <View style={{ marginTop: "auto" }}>
              <Button
                testID="submit-button"
                onPress={() => handleSubmit()}
                label="Próximo"
              />
            </View>
          </View>
        )}
      </Formik>
    </ContentWrapper>
  );
}
