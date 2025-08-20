import ContentWrapper from "@/components/ContentWrapper";
import EmptyListMessage from "@/components/EmptyListMessage";
import HistoryFilters, {
  HistoryFilter,
} from "@/components/screens/transfersHistory/HistoryFilters";
import TransferHistoryCard from "@/components/screens/transfersHistory/TransferHistoryCard";
import ScreenTitle from "@/components/ScreenTitle";
import { store } from "@/store";
import { Palette } from "@/utils/constants/Colors";
import cleanFormattedMoneyValue from "@/utils/functions/cleanFormattedMoneyValue";
import Transfer from "@/utils/types/Transfer";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Toast } from "toastify-react-native";

const initialFilter = {
  value: "",
  name: "",
  date: "",
};

export default function TransfersHistory() {
  const { user } = store.getState();

  const [isFetching, setIsFetching] = useState(true);

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);

  const [historyFilter, setHistoryFilter] =
    useState<HistoryFilter>(initialFilter);

  const fetchTransfersList = useCallback(async () => {
    try {
      const {
        data: { transfers },
      } = await axios.get(`/api/transferlist/${user.id}`);

      setTransfers(transfers);
      setFilteredTransfers(transfers);
    } catch (err) {
      Toast.error("Desculpe, houve um erro ao carregar as transferências!");
    } finally {
      setIsFetching(false);
    }
  }, [user.id]);

  const handleFilter = useCallback(() => {
    setFilteredTransfers(
      transfers.filter((transfer) => {
        const hasFilteredName =
          !historyFilter.name ||
          transfer.payee.name
            .toLocaleLowerCase()
            .includes(historyFilter.name.toLocaleLowerCase());

        const hasFilteredValue =
          !historyFilter.value ||
          transfer.value === cleanFormattedMoneyValue(historyFilter.value);

        const hasFilteredDate =
          !historyFilter.date || transfer.date === historyFilter.date;

        return hasFilteredName && hasFilteredValue && hasFilteredDate;
      })
    );
  }, [historyFilter.date, historyFilter.name, historyFilter.value, transfers]);

  useEffect(() => {
    fetchTransfersList();
  }, []);

  return (
    <ContentWrapper>
      <ScreenTitle iconName="history" text="Histórico de transferências" />
      {isFetching ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={60} color={Palette.darkBlue} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <HistoryFilters
            handleFilter={handleFilter}
            historyFilter={historyFilter}
            setHistoryFilter={setHistoryFilter}
          />
          {!!filteredTransfers.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredTransfers}
              renderItem={({ item }) => {
                const itemAux: any = { ...item };
                delete itemAux.userId;

                return <TransferHistoryCard {...itemAux} />;
              }}
              keyExtractor={(_, index) => `transfer-${index}`}
            />
          ) : (
            <EmptyListMessage text="Nenhuma transferência encontrada." />
          )}
        </View>
      )}
    </ContentWrapper>
  );
}
