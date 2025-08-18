import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
const TrendingCard = ({
  movie: { title, movie_id, poster_url, genres },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48  rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5  px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white font-bold text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14 "
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
        {genres && (
          <View className="">
            <Text className="text-white" numberOfLines={1}>{Array.from(JSON.parse(genres)).join(", ")}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
