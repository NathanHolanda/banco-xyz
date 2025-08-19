import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import DatePicker from "@/components/DatePicker";
import ScreenTitle from "@/components/ScreenTitle";
import { actions, store } from "@/store";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import formatDateToRequestBody from "@/utils/functions/formatDateToRequestBody";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";

export default function TransferDate() {
  const dispatch = useDispatch();
  const { balance } = store.getState();

  const user = store.getState().user;
  const router = useRouter();

  const params = useLocalSearchParams<{ payee: string; value: string }>();

  type SubmitData = { date: string };
  const onSubmitData = async (values: SubmitData) => {
    const { payee, value } = params;
    const payeeData = JSON.parse(payee);
    const valueData = JSON.parse(value);

    const data = {
      userId: user.id,
      payeeName: payeeData.name,
      payeeDocument: payeeData.document,
      currency: valueData.currency,
      value: valueData.value,
      transferDate: values.date,
    };

    try {
      await axios.post("/api/transfer", data);

      dispatch(actions.setBalance(balance - valueData.value));

      router.replace("/home");
      router.back();

      Toast.success("Transferência realizada com sucesso!");
    } catch (err) {
      Toast.error("Desculpe, houve um erro no servidor!");
    }
  };

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Insira o valor"
      />
      <Formik
        initialValues={{ date: formatDateToRequestBody(new Date()) }}
        onSubmit={onSubmitData}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <DatePicker
                onSelect={(value) => setFieldValue("date", value)}
                min={new Date()}
              />
            </View>
            <View style={{ marginTop: "auto" }}>
              <Button
                onPress={() => handleSubmit()}
                label="Realizar transferência"
              />
            </View>
          </View>
        )}
      </Formik>
    </ContentWrapper>
  );
}
