import React from "react";
import { StyledItemsContainer } from "./ItemsContainer.styles";

type ItemContainerProps = {
  children: React.ReactNode;
};

export default function ItemsContainer({ children }: ItemContainerProps) {
  return <StyledItemsContainer>{children}</StyledItemsContainer>;
}
