import {useState} from "react";
import {usePlayer} from "@/providers/PlayerProvider";
import {Redirect} from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import {downloadEpisode, deleteEpisodeDownload} from "@/services/downloads";
import {useDownloadsStore} from "@/stores/useDownloadsStore";

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function PlayerScreen() {
  const {episode, player, playerStatus} = usePlayer();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    addDownload,
    removeDownload,
    isDownloaded: checkDownloaded
  } = useDownloadsStore();
  const isDownloaded = episode ? checkDownloaded(episode.guid) : false;
}
