import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Palette } from "@/utils/constants/Colors";
import { ContentPadding } from "@/utils/constants/DefaultMeasures";
import maskMoneyValue from "@/utils/functions/maskMoneyValue";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import _ from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import {
  CleanFilterButton,
  CleanFilterButtonText,
  FilterButton,
  FilterButtonText,
} from "./HistoryFilters.styles";

export type HistoryFilter = {
  value: string;
  name: string;
  date: string;
};
type Props = {
  historyFilter: HistoryFilter;
  setHistoryFilter: (value: HistoryFilter) => void;
  handleFilter: () => void;
};

export default function HistoryFilters({
  historyFilter,
  setHistoryFilter,
  handleFilter,
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Filtrar histórico"
        content={
          <View>
            <CleanFilterButton
              onPress={() =>
                setHistoryFilter({ value: "", name: "", date: "" })
              }
            >
              <CleanFilterButtonText>Limpar filtros</CleanFilterButtonText>
            </CleanFilterButton>
            <View style={{ gap: 10, marginBottom: ContentPadding * 2 }}>
              <Input
                placeholder="Filtrar por beneficiário"
                value={historyFilter.name}
                onChangeText={(text) =>
                  setHistoryFilter({ ...historyFilter, name: text })
                }
              />
              <Input
                placeholder="Filtrar por valor..."
                value={historyFilter.value ?? ""}
                onChangeText={(text) =>
                  setHistoryFilter({
                    ...historyFilter,
                    value: maskMoneyValue(_.toString(text)),
                  })
                }
              />
              <DatePicker
                onSelect={(value) =>
                  setHistoryFilter({ ...historyFilter, date: value })
                }
                defaultToday={false}
                placeholder="Filtrar por data..."
              />
            </View>
            <Button
              label="Confirmar"
              onPress={() => {
                handleFilter();
                setIsModalVisible(false);
              }}
            />
          </View>
        }
      />
      <FilterButton onPress={() => setIsModalVisible(true)}>
        <FilterButtonText>Filtrar</FilterButtonText>
        <MaterialIcons name="filter-alt" size={20} color={Palette.black} />
      </FilterButton>
    </View>
  );
}
