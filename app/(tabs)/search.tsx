import { View, Text, Image, ActivityIndicator, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    refetch: loadMovies,
    reset,
    error: moviesError,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <ScrollView className=" flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className=" flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <SearchBar
          autoFocus={true}
          placeholder="Search for a movie"
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
        {moviesLoading && (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="mt-10 self-center"
          />
        )}
        {moviesError && (
          <Text className=" text-white">Error: {moviesError?.message}</Text>
        )}
        {movies?.length > 0 && (
          <View className="flex-1 mt-5">
            <>
              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length > 0 && (
                  <Text className=" text-xl text-white font-bold my-3">
                    Searh Result for{" "}
                    <Text className="text-violet-600">{searchQuery}</Text>
                  </Text>
                )}
              <FlatList
                scrollEnabled={false}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => <MovieCard {...item} />}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                ListEmptyComponent={
                  !moviesLoading && !moviesError ? (
                    <View className="mt-10 px-5">
                      <Text>
                        {searchQuery.trim()
                          ? "No movies found"
                          : "Search movie"}
                      </Text>
                    </View>
                  ) : null
                }
              />
            </>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default search;
