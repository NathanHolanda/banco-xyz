import { actions } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import removeFromAsyncStorage from "@/utils/functions/removeFromAsyncStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonText } from "./Logout.styles";
export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Button
      onPress={() => {
        removeFromAsyncStorage("user");
        dispatch(actions.removeUser());

        router.replace("/login");
      }}
    >
      <MaterialIcons name="logout" color={Palette.black} size={12} />
      <ButtonText>Sair</ButtonText>
    </Button>
  );
}
