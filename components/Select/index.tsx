import { Palette } from "@/utils/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import InputErrorMessage from "../InputErrorMessage";
import Modal from "../Modal";
import { ItemText, SelectText, SelectTrigger } from "./Select.styles";

type SelectProps = {
  title?: string;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: string;
} & TouchableOpacityProps;

export default function Select({
  title,
  placeholder,
  options,
  onSelect,
  error,
  testID,
  ...rest
}: SelectProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={title ?? "Selecione a opção"}
        content={
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                testID="option"
                onPress={() => {
                  setValue(item);
                  onSelect(item);

                  setIsModalVisible(false);
                }}
              >
                <ItemText>{item}</ItemText>
              </TouchableOpacity>
            )}
            keyExtractor={(_, i) => `option-${i}`}
          />
        }
      />

      {!!error && <InputErrorMessage text={error} />}
      <SelectTrigger
        {...rest}
        testID={testID}
        error={!!error}
        onPress={() => setIsModalVisible(true)}
      >
        <SelectText isPlaceholderText={!value.length}>
          {value.length ? value : placeholder ?? "Selecione..."}
        </SelectText>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={Palette.darkBlue}
          size={20}
        />
      </SelectTrigger>
    </View>
  );
}
