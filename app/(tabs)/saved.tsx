import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMoviesByIds } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useStorage } from "@/services/useStorage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Saved = () => {
  const { item: saved } = useStorage<number[]>("save");
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
    refresh: loadMovies,
  } = useFetch(() => fetchMoviesByIds(saved ?? []), false);

  useEffect(() => {
    saved && saved.length > 0 && loadMovies();
    //eslint-disable-next-line
  }, [saved]);
  return (
    <View className="flex-1  bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full  z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          marginBottom: 52,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 m-20 mb-5 mx-auto" />
        <SearchBar
          placeholder={"Search through 300+ movies online"}
          onPress={() => router.push("/search")}
        />
        {loading && (
          <ActivityIndicator
            color={"#0000ff"}
            size={"large"}
            className="self-center mt-10"
          />
        )}
        {error && (
          <Text className="text-red-500 px-5 my-3">
            error: {error?.message}
          </Text>
        )}

        {movies && movies.length > 0 ? (
          <View>
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Saved Movies
            </Text>
            <View className="flex-1 mt-5">
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pd-32"
                contentContainerStyle={{
                  marginBottom: 52,
                }}
              />{" "}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Saved;
