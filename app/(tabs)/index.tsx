import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
// import { MapTrendingMoviesToGenre } from "@/utils/index.utils";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/searchBar";

export default function Index() {
  const router = useRouter();
  // const [trendingMoviesData, setTrendingMoviesData] = useState<TrendingMovie[]>(
  //   []
  // );
  const {
    data: trendingMovies,
    error: trendingError,
    loading: trendingLading,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(() => fetchMovies({ query: "" }));

  // useEffect(() => {
  //   if (trendingMovies && genreList) {
  //     const list = MapTrendingMoviesToGenre(trendingMovies, genreList);
  //     setTrendingMoviesData(list);
  //   }
  // }, [genreList, trendingMovies]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 m-20 mb-5 mx-auto" />
        {moviesLoading || trendingLading ? (
          <ActivityIndicator
            color={"#0000ff"}
            size={"large"}
            className="self-center mt-10"
          />
        ) : moviesError ? (
          <Text>
            moviesError: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder={"Search for a movie..."}
            />

            {trendingMovies && trendingMovies.length && (
              <View>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, i) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
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
              contentContainerStyle={{
                marginBottom: 52,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
