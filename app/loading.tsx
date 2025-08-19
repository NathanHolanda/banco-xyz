import Container from "@/components/screens/loading/Container";
import { actions } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import getFromAsyncStorage from "@/utils/functions/getFromAsyncStorage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

export default function Loading() {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkLoggedUser = async () => {
    const user = await getFromAsyncStorage("user");
    if (!!user) {
      dispatch(actions.setUser(user));

      router.replace("/home");
    } else {
      router.replace("/login");
    }
  };

  useEffect(() => {
    checkLoggedUser();
  }, []);

  return (
    <Container>
      <ActivityIndicator color={Palette.darkBlue} size={100} />
    </Container>
  );
}
