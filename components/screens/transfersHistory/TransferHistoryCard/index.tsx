import formatNumberToCurrency from "@/utils/functions/formatNumberToCurrency";
import maskCpf from "@/utils/functions/maskCpf";
import Transfer from "@/utils/types/Transfer";
import React from "react";
import { View } from "react-native";
import {
  DataContainerRow,
  DataItem,
  DataLabel,
  DataValue,
  HorizontalRow,
  PayeeText,
  StyledCard,
} from "./TransferHistoryCard.styles";

export default function TransferHistoryCard({
  currency,
  date,
  payee,
  value,
}: Omit<Transfer, "userId">) {
  return (
    <StyledCard testID="transfer-card">
      <PayeeText>Beneficiário</PayeeText>
      <View>
        <DataItem>
          <DataLabel>Nome:</DataLabel>
          <DataValue>{payee.name}</DataValue>
        </DataItem>
        <DataItem>
          <DataLabel>CPF:</DataLabel>
          <DataValue>{maskCpf(payee.document)}</DataValue>
        </DataItem>
      </View>
      <HorizontalRow />
      <DataContainerRow>
        <DataItem>
          <DataLabel>Valor:</DataLabel>
          <DataValue>{formatNumberToCurrency(value, currency)}</DataValue>
        </DataItem>
        <DataItem>
          <DataLabel>Data:</DataLabel>
          <DataValue>{new Date(date).toLocaleDateString()}</DataValue>
        </DataItem>
      </DataContainerRow>
    </StyledCard>
  );
}
