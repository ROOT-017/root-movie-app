import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { CreateImageUri } from "@/utils/index.utils";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-200 text-sm mt-2">{value || "NA"}</Text>
  </View>
);
const MoviesDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movieDetail } = useFetch(() =>
    fetchMovieDetails(+id.toString())
  );
  return (
    <View className="bg-primary relative flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="flex-1 items-center justify-center">
          <Image
            source={{
              uri: CreateImageUri(movieDetail?.poster_path || ""),
            }}
            className="w-full h-[550px] rounded-lg"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col item-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">
            {movieDetail?.title}
          </Text>
          <View className="flex-row item-center gap-x-2 mt-2 ">
            <Text className="text-light-200 text-sm">
              {movieDetail?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {movieDetail?.runtime}m
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movieDetail?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movieDetail?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movieDetail?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movieDetail?.genres.map((genre) => genre.name).join(", ") || "N/A"
            }
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movieDetail?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movieDetail?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movieDetail?.production_companies
                .map((company) => company.name)
                .join(" - ") || "N/A"
            }
          />
          <MovieInfo
            label="Production Countries"
            value={
              movieDetail?.production_countries
                .map((country) => country.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className=" bottom-12 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoviesDetails;
