import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, getGenres } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useStorage } from "@/services/useStorage";
import { CreateGenreListFromMovies } from "@/utils/index.utils";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";

const Search = () => {
  const { item: genreList } = useStorage("genre", getGenres);
  const ref = useRef<TextInput | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  // const router = useRouter();
  const {
    data: movies,
    loading,
    error,
    refresh: loadMovies,
    reset,
  } = useFetch<Movie[]>(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    // movies && updateSearchCount(searchQuery.trim(), movies?.[0]);
    const timerId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timerId);
    // func();
    //eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    const func = async () => {
      if (movies && movies?.length > 0 && movies?.[0]) {
        const genres = CreateGenreListFromMovies(genreList ?? [], movies[0]);
        await updateSearchCount(searchQuery, {
          ...movies[0],
          genres: JSON.stringify(genres),
        });
      }
    };
    func();
  }, [movies, searchQuery, genreList]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <View className="flex-1 bg-primary ">
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
        <View>
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{
              // minHeight: "100%",
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              <>
                <View className="w-full flex-row justify-center mt-20 items-center">
                  <Image
                    source={icons.logo}
                    className="w-12 h-10 m-20 mb-5 mx-auto"
                  />
                </View>
                <SearchBar
                  placeholder={"Search through 300+ movies online"}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  ref={ref}
                />
                {loading && (
                  <ActivityIndicator
                    color={"#0000ff"}
                    size={"large"}
                    className="self-cent mt-10"
                  />
                )}
                {error && (
                  <Text className="text-red-500 px-5 my-3">
                    error: {error?.message}
                  </Text>
                )}
                {!loading &&
                !error &&
                searchQuery.trim() &&
                movies &&
                movies?.length > 0 ? (
                  <View className="flex-1 mt-5">
                    <Text className="text-white text-xl font-bold">
                      Search Results for
                      <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                    <Text className="text-xl text-white font-semibold">
                      Popular Movies
                    </Text>

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
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            }
            ListEmptyComponent={
              !loading && !error ? (
                <View className="mt-10 px-5">
                  <Text className="text-gray-500 text-center mt-5">
                    {searchQuery.trim()
                      ? `No movies found`
                      : "Search for a movie"}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
