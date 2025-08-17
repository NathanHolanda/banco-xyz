import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import IconName from "@/utils/types/IconName";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View } from "react-native";
import {
  SubText,
  SubTextContainer,
  Title,
  TitleContainer,
} from "./ScreenTitle.styles";

type ScreenTitleProps = {
  iconName: IconName;
  text: string;
  subText?: string;
};

export default function ScreenTitle({
  text,
  subText,
  iconName,
}: ScreenTitleProps) {
  return (
    <View style={{ marginBottom: ContentPadding }}>
      <TitleContainer>
        <MaterialIcons name={iconName} size={24} color={Palette.marineBlue} />
        <Title>{text}</Title>
      </TitleContainer>
      {subText && (
        <SubTextContainer>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={Palette.darkBlue}
          />
          <SubText>{subText}</SubText>
        </SubTextContainer>
      )}
    </View>
  );
}
