import ContentWrapper from "@/components/ContentWrapper";
import Input from "@/components/screens/login/Input";
import SubmitButton from "@/components/screens/login/SubmitButton";
import { actions } from "@/store";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

type LoginRequestBody = { email: string; password: string };

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido!")
      .required("E-mail obrigatório!"),
    password: Yup.string()
      .min(4, "Senha muito curta!")
      .required("Senha obrigatória!"),
  });

  const handleSubmitLogin = useCallback(
    async (values: LoginRequestBody) => {
      try {
        const { data } = await axios.post("/api/login", {
          ...values,
          email: values.email.toLocaleLowerCase(),
        });
        dispatch(actions.setUser(data.user));

        router.replace("/home");
      } catch (err) {
        if ((err as AxiosError).status === 401)
          Toast.error("E-mail ou senha incorretos!");
        else Toast.error("Desculpe, houve um erro no servidor!");
      }
    },
    [dispatch, router]
  );

  return (
    <ContentWrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitLogin}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <View>
            <View style={{ marginBottom: 60, marginTop: ContentPadding }}>
              <Input
                testID="input-email"
                iconName="person"
                placeholder="E-mail"
                onChangeText={handleChange("email")}
                error={errors.email}
              />
              <Input
                testID="input-password"
                iconName="lock"
                placeholder="Senha"
                onChangeText={handleChange("password")}
                secureTextEntry
                error={errors.password}
              />
            </View>
            <SubmitButton
              testID="submit-button"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </ContentWrapper>
  );
}
