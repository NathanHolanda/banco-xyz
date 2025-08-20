import { Palette } from "@/utils/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ReactNode } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import {
  ModalContent,
  ModalContentHeader,
  ModalContentHeaderTitle,
  OverlayContainer,
} from "./Modal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
};

export default function CustomModal({
  content,
  onClose,
  title,
  visible,
}: Props) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <OverlayContainer onTouchEnd={onClose}>
          <ModalContent onTouchEnd={(e) => e.stopPropagation()}>
            <ModalContentHeader>
              <ModalContentHeaderTitle>
                {title ?? "Selecione a opção"}
              </ModalContentHeaderTitle>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={onClose}
              >
                <MaterialIcons name="close" color={Palette.black} size={30} />
              </TouchableOpacity>
            </ModalContentHeader>
            {content}
          </ModalContent>
        </OverlayContainer>
      </Modal>
    </View>
  );
}
