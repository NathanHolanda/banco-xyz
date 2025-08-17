import ContentWrapper from "@/components/ContentWrapper";
import BalanceCard from "@/components/screens/home/BalanceCard";
import ItemCard from "@/components/screens/home/ItemCard";
import ItemsContainer from "@/components/screens/home/ItemsContainer";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <ContentWrapper>
      <View style={{ gap: 20 }}>
        <BalanceCard balance={1234.5} />
        <ItemsContainer>
          <ItemCard
            iconName="paid"
            title="Fazer uma transferência"
            routeName="/makeTransfer/payeeData"
          />
          <ItemCard
            iconName="history"
            title="Histórico de transferências"
            routeName="/transfersHistory"
          />
        </ItemsContainer>
      </View>
    </ContentWrapper>
  );
}
