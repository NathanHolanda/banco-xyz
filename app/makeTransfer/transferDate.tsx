import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import DatePicker from "@/components/DatePicker";
import ScreenTitle from "@/components/ScreenTitle";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

export default function TransferDate() {
  const router = useRouter();

  const params = useLocalSearchParams<{ payee: string; value: string }>();

  return (
    <ContentWrapper>
      <ScreenTitle
        text="Fazer nova transferência"
        iconName="paid"
        subText="Insira o valor"
      />
      <Formik
        initialValues={{ date: "" }}
        onSubmit={(values) => {
          router.replace("/home");
          router.back();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: ContentPadding, gap: ContentPadding }}>
              <DatePicker onSelect={(value) => setFieldValue("date", value)} />
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
