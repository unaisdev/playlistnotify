import React from "react";
import { Linking, Pressable, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import { RootStackParamList } from "../../../navigation";
import { PlaylistModel } from "../../../services/types";

type Props = {
  item: PlaylistModel;
  index: number;
};

const SearchItem = ({ item, index }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.duration(300).delay(index * 100)}
      exiting={FadeOutRight.duration(300)}
      layout={Layout.duration(800).delay(index * 100)}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("Playlist", { id: item.id });
        }}
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          columnGap: 12,
        }}
      >
        <Image
          style={{ width: 58, height: 58 }}
          source={{ uri: item.images[0]?.url }}
        />
        <View>
        {/* className="flex-row justify-between flex-grow" */}
          <View>
            <Text
            //   className="font-semibold mb-1 text-black w-[180px]"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            {/* <Text>{item.collaborative ? "Col." : ""}</Text> */}
            <Pressable
            //   className="flex flex-row items-center justify-start w-auto "
              onPress={() => {
                Linking.openURL(item.owner.uri);
              }}
            >
              <Feather name="user" size={10} color="black" />
              <Text 
            //   className="pl-1 text-xs text-black" numberOfLines={1}
              >
                {item.owner?.display_name}
              </Text>
            </Pressable>
          </View>
          <View 
        //   className="flex justify-end"
          >
            <Text style={{ fontSize: 10 }}>
              {item.tracks.total} canciones
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(SearchItem);
