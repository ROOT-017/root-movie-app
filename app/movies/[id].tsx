import { IMAGE_PLACEHOLDER_URL } from "@/constants/constant";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useStorage } from "@/services/useStorage";
import { CreateImageUri } from "@/utils/index.utils";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | null;
  element?: React.ReactNode;
}
const MovieInfo = ({ label, value, element }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    {value ? (
      <Text className="text-light-200 text-sm mt-2">{value}</Text>
    ) : element ? (
      <View className="mt-2 flex-row gap-2 flex-wrap">{element}</View>
    ) : (
      "N/A"
    )}
  </View>
);

const Tags = ({ text }: { text: string }) => {
  return (
    <View className="self-start bg-dark-100 px-2 py-1 rounded-md mt-2">
      <Text className="text-light-200">{text}</Text>
    </View>
  );
};
const MoviesDetails = () => {
  const { id } = useLocalSearchParams();
  const [isSave, setIsSaved] = useState(false);
  const { data: movieDetail } = useFetch(() =>
    fetchMovieDetails(+id.toString())
  );
  const { setItemInStorage, item: saved } = useStorage<number[]>("save");

  useEffect(() => {
    if (saved?.includes(+id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [saved, id]);
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
              uri:
                CreateImageUri(movieDetail?.poster_path || "").trim() ??
                IMAGE_PLACEHOLDER_URL,
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
            <Text className="text-light-200 text-sm">&#8226;</Text>
            <Text className="text-light-200 text-sm">
              {movieDetail?.runtime}m
            </Text>
          </View>
          <View className="flex flex-row gap-x-2">
            <View className="flex-row self-start items-center  bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movieDetail?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-light-200 text-sm">
                ({movieDetail?.vote_count} votes)
              </Text>
            </View>
            <View className="flex-row self-start items-center  bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.growth} className="size-4" />
              <Text className="text-light-200 text-sm">
                ({movieDetail?.popularity})
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (isSave) {
                  setIsSaved(false);
                  setItemInStorage(saved?.filter((id) => id !== +id) ?? []);
                } else {
                  setIsSaved(true);
                  setItemInStorage([...(saved ?? []), +id]);
                }
              }}
            >
              <View className="flex-row self-start items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image
                  source={isSave ? icons.bookmarked : icons.bookmark}
                  className="size-4"
                />
                <Text className="text-light-200 text-sm">
                  {isSave ? "Remove from bookmarks" : "Add to bookmarks"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <MovieInfo label="Overview" value={movieDetail?.overview} />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Release date"
              value={dayjs(movieDetail?.release_date).format("MMMM DD, YYYY")}
            />
            <MovieInfo label="Status" value={movieDetail?.status} />
          </View>
          <MovieInfo
            label="Genres"
            element={movieDetail?.genres.map((genre) => (
              <Tags key={genre.id} text={genre.name} />
            ))}
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
            element={movieDetail?.production_companies.map((company) => (
              <View key={company.id} className="flex-row gap-x-1 items-center">
                <Image
                  source={{
                    uri: CreateImageUri(company.logo_path || ""),
                    height: 20,
                    width: 20,
                  }}
                  className="rounded-full size-10 "
                  resizeMode="contain"
                />
                <Text className="text-light-200 text-sm">{company.name}</Text>
              </View>
            ))}
          />
          <MovieInfo
            label="Production Countries"
            element={movieDetail?.production_countries.map((country, index) => (
              <Text key={country.iso_3166_1} className="text-light-200 text-sm">
                {country.name}
                {index < movieDetail?.production_countries.length - 1 ? (
                  <Text>&#8226;</Text>
                ) : null}
              </Text>
            ))}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className=" bottom-12 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        // onPress={router.back}
      >
        <Text className="text-white font-semibold text-base">
          Visit Homepage
        </Text>
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 "
          tintColor={"#fff"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute top-12  left-0 mx-5 bg-accent rounded-lg p-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MoviesDetails;
