import {ActivityIndicator, FlatList, View, Text} from "react-native";
import {fetchTrending} from "@/services/podcast-index";
import {useQuery} from "@tanstack/react-query";
import {PodcastCard} from "@/components/PodcastCard";

const DATA = [
  {id: "1", title: "Item 1"},
  {id: "2", title: "Item 2"},
  {id: "3", title: "Item 3"}
];

export default function HomeScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending()
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch trending</Text>;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={data?.feeds}
        contentContainerClassName="gap-4 p-2"
        columnWrapperClassName="gap-2"
        renderItem={({item}) => (
          <View key={item.id} className="flex-1 max-w-1/2">
            <PodcastCard podcast={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentInsetAdjustmentBehavior="automatic"
        numColumns={2}
      />
    </View>
  );
}
