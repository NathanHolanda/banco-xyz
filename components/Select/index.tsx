import { Palette } from "@/utils/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import {
  ItemText,
  ModalContent,
  ModalContentHeader,
  ModalContentHeaderTitle,
  OverlayContainer,
  SelectText,
  SelectTrigger,
} from "./Select.styles";

type SelectProps = {
  title?: string;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function Select({
  title,
  placeholder,
  options,
  onSelect,
}: SelectProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <OverlayContainer onTouchEnd={() => setIsModalVisible(false)}>
          <ModalContent onTouchEnd={(e) => e.stopPropagation()}>
            <ModalContentHeader>
              <ModalContentHeaderTitle>
                {title ?? "Selecione a opção"}
              </ModalContentHeaderTitle>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => setIsModalVisible(false)}
              >
                <MaterialIcons name="close" color={Palette.black} size={30} />
              </TouchableOpacity>
            </ModalContentHeader>

            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
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
          </ModalContent>
        </OverlayContainer>
      </Modal>
      <SelectTrigger onPress={() => setIsModalVisible(true)}>
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
