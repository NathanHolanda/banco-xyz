import { ReactNode } from "react";
import { StyledContainer } from "./Container.styles";

type LoadingProps = {
  children: ReactNode;
};

export default function Container({ children }: LoadingProps) {
  return <StyledContainer>{children}</StyledContainer>;
}
