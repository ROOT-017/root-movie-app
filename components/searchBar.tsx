import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";
interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  ref?: React.RefObject<TextInput | null>;
}
const SearchBar = ({
  value,
  onPress,
  placeholder,
  onChangeText,
  ref,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        tintColor={"#ab8bff"}
        resizeMode="contain"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        ref={ref}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className=" ml-2 text-white flex-1"
      />
    </View>
  );
};

export default SearchBar;
