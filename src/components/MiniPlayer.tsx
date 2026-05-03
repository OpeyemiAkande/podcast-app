import {usePlayer} from "@/providers/PlayerProvider";
import {router} from "expo-router";
import {View, Text, Pressable, Image} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MiniPlayer() {
  const {player, playerStatus, episode} = usePlayer();

  if (!episode) return null;

  const togglePlayback = () => {
    if (playerStatus.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipForward = () => {
    const duration = playerStatus.duration || 0;

    player.seekTo(Math.min(duration, playerStatus.currentTime + 30));
  };

  return (
    <Pressable
      onPress={() => router.push("/player")}
      className="flex-row items-center gap-3 px-4 py-3 bg-white rounded-2xl"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4
        },
        elevation: 5
      }}
    >
      <Image
        className="w-12 h-12 rounded-lg"
        source={{
          uri: episode.image || episode.feedImage || ""
        }}
      />

      <View className="flex-1">
        <Text className="text-sm font-semibold" numberOfLines={1}>
          {episode.title}
        </Text>

        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {episode.datePublishedPretty}
        </Text>
      </View>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          togglePlayback();
        }}
        className="p-2"
      >
        <Ionicons
          name={playerStatus.playing ? "pause" : "play"}
          size={24}
          color="dimgray"
        />
      </Pressable>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          skipForward();
        }}
        className="p-2"
      >
        <Ionicons name="play-forward" size={22} color="dimgray" />
      </Pressable>
    </Pressable>
  );
}
