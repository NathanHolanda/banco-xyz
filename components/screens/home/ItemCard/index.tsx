import { Palette } from "@/utils/constants/Colors";
import IconName from "@/utils/types/IconName";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, useRouter } from "expo-router";
import React from "react";
import { CardButton, ItemCardText, StyledCard } from "./ItemCard.styles";

type ItemCardProps = {
  iconName: IconName;
  title: string;
  routeName: Href;
};

export default function ItemCard({
  iconName,
  title,
  routeName,
}: ItemCardProps) {
  const router = useRouter();

  return (
    <StyledCard>
      <CardButton onPress={() => router.push(routeName)}>
        <ItemCardText>{title}</ItemCardText>
        <MaterialIcons name={iconName} size={76} color={Palette.darkBlue} />
      </CardButton>
    </StyledCard>
  );
}
