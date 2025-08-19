import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const InputField = () => {
  return (
    <View className="flex-row items-center bg-white overflow-hidden rounded-lg px-5 py-2">
      <Image
        source={icons.person}
        className="size-5"
        tintColor={"#ab8bff"}
        resizeMode="contain"
      />
      <TextInput
        // onPress={onPress}
        // placeholder={placeholder}
        // value={value}
        // ref={ref}
        // onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className=" ml-2 text-accent flex-1"
      />
    </View>
  );
};
const Profile = () => {
  return (
    <View className="flex-1  bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full  z-0"
        resizeMode="cover"
      />
      <View className="w-full h-10 m-20 mb-5 mx-auto" />

      <View className="">
        <Image
          source={icons.person}
          className=" rounded-full h-[100px]  mx-auto  w-[100px]   z-0"
          resizeMode="cover"
        />
      </View>
      {/* <View className=" h-10  w-full mt-20 mx-auto" /> */}
      <View className=" gap-y-4 p-4">
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <TouchableOpacity className="bg-accent text-2xl  p-3.5 justify-center items-center rounded-lg">
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
