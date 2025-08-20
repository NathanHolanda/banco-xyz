import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/Input";
import ScreenTitle from "@/components/ScreenTitle";
import Select from "@/components/Select";
import { store } from "@/store";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import cleanFormattedMoneyValue from "@/utils/functions/cleanFormattedMoneyValue";
import maskMoneyValue from "@/utils/functions/maskMoneyValue";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

export default function PayeeData() {
  const { balance } = store.getState();

  const router = useRouter();

  const params = useLocalSearchParams<{ payee: string }>();
  const { payee } = params;

  const validationSchema = Yup.object().shape({
    currency: Yup.string().required("Moeda obrigatória!"),
    value: Yup.string()
      .required("Valor obrigatório!")
      .not(["0", "00"], "Valor inválido!"),
  });

  const checkHasEnoughBalance = useCallback(
    (value: string) => {
      const cleanedValue = cleanFormattedMoneyValue(value);

      return balance - cleanedValue >= 0;
    },
    [balance]
  );

  type SubmitData = { currency: string; value: string };
  const onSubmitData = useCallback(
    (values: SubmitData) => {
      if (checkHasEnoughBalance(values.value)) {
        router.push({
          pathname: "/makeTransfer/transferDate",
          params: {
            payee,
            value: JSON.stringify({
              ...values,
              value: cleanFormattedMoneyValue(values.value),
            }),
          },
        });
      } else Toast.error("Saldo insuficiente!");
    },
    [checkHasEnoughBalance, payee, router]
  );

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Insira o valor"
      />
      <Formik
        initialValues={{ currency: "", value: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmitData}
        validateOnChange={false}
      >
        {({ handleSubmit, values, setFieldValue, errors }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <Select
                title="Selecione a moeda"
                options={["BRL", "USD", "EUR"]}
                onSelect={(value) => setFieldValue("currency", value)}
                placeholder="Selecionar moeda"
                error={errors.currency}
              />
              <Input
                onChangeText={(text) =>
                  setFieldValue("value", maskMoneyValue(text))
                }
                value={values.value}
                placeholder="Valor da transferência"
                error={errors.value}
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
