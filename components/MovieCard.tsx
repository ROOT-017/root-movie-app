import { IMAGE_PLACEHOLDER_URL } from "@/constants/constant";
import { icons } from "@/constants/icons";
import { CreateImageUri } from "@/utils/index.utils";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface MovieCardProps extends Movie {}
export default function MovieCard({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
}: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? CreateImageUri(poster_path)
              : IMAGE_PLACEHOLDER_URL,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-semibold text-white mt-2" numberOfLines={1}>{title}</Text>
        <View className={"flex-row items-center justify-start gap-x-1"}>
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold uppercase text-white">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium mt-1">
            Movie{" "}
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
