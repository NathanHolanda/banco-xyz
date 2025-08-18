import { Palette } from "@/utils/constants/Colors";
import formatDateToRequestBody from "@/utils/functions/formatDateToRequestBody";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DatePickerText, DatePickerTrigger } from "./DatePicker.styles";

type DatePickerProps = {
  placeholder?: string;
  onSelect: (value: string) => void;
};

export default function DatePicker({ placeholder, onSelect }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState<Date>(new Date());
  const [isSelectedValueToday, setIsSelectedValueToday] = useState(false);

  useEffect(() => {
    setIsSelectedValueToday(
      value.toLocaleDateString() === new Date().toLocaleDateString()
    );
  }, [value]);

  return (
    <View>
      <DatePickerTrigger>
        {showPicker && (
          <RNDateTimePicker
            mode="date"
            value={value ?? new Date()}
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setValue(selectedDate);
                onSelect(formatDateToRequestBody(selectedDate));
              }

              setShowPicker(false);
            }}
          />
        )}
        <DatePickerText
          isPlaceholderText={!value}
          onPress={() => setShowPicker(true)}
        >
          {value
            ? value.toLocaleDateString() +
              (isSelectedValueToday ? " (hoje)" : "")
            : placeholder ?? "Selecione a data..."}
        </DatePickerText>
        <MaterialIcons
          name="calendar-month"
          color={Palette.darkBlue}
          size={20}
        />
      </DatePickerTrigger>
    </View>
  );
}
