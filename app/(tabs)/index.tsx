import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrandingCard from "@/components/TrandingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


export default function Index() {
  const router = useRouter();
  const {data: trendingMovies, loading: trandingLoading, error:trendingError } = useFetch(getTrendingMovies, true);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
    true
  );
  return (
    <ScrollView className=" flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View
        className=" flex-1 px-5"
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trandingLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className=" text-white">Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {
              trendingMovies && (
                <View className="mt-10">
                    <Text className=" text-lg text-white font-bold mb-3">Trending Movies</Text>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-5" />}
                    data={trendingMovies}
                    renderItem={({item, index})=>(
                      <TrandingCard movie={item} index={index}  />
                    )}
                    keyExtractor={(item)=> item.$id as string}
                    />
                </View>
              )
            }
            <>
             <Text className=" text-lg  text-white font-bold mt-5 mb-3">Latest Movies</Text>
             <FlatList
             scrollEnabled={false}
             data={movies}
             keyExtractor={(item)=> item.id.toString()}
             numColumns={3}
             renderItem={({item})=>(
              <MovieCard {...item}/>
             )}
             columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10
             }}
             />
            </>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
