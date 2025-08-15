import React from "react";
import { View } from "react-native";

type ContentWrapperProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return <View style={{ flex: 1, padding: 20 }}>{children}</View>;
}
