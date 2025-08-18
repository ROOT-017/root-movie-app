import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex-1 flex-col gap-5 justify-center items-center">
        <Image
          source={icons.person}
          className="size-10"
          tintColor={"#fff"}
        ></Image>
        <Text className="text-5xl font-bold text-gray-500 ">Profile</Text>
      </View>
    </View>
  );
};

export default Profile;
