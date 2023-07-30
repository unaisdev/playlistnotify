import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import { useEffect, useState } from "react";
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
  import React from "react";
  
  type Props = {
    id: string;
  };
  
  const NotifyMeButton = ({ id }: Props) => {
    const [notifyMeButtonSelected, setNotifyMeButtonSelected] = useState(false);
    const [loading, setLoading] = useState(false);
  
    // const { user } = useUserStore();
  
    // const { addPlaylistId, removePlaylistId, updatePlaylist, isPlaylistSaved } =
    //   usePlaylistsForNotifyStore();
    // const { accessToken } = useAccessTokenStore();
  
    const handleNotifyMeButtonPress = async () => {
      setLoading(true);
    //   !notifyMeButtonSelected
    //     ? await addPlaylistId(id, user.id, accessToken)
    //     : await removePlaylistId(id, user.id);
  
      setNotifyMeButtonSelected((previousState) => !previousState);
      setLoading(false);
    };
  
    useEffect(() => {
      const isSaved = async () => {
        // const bool = await isPlaylistSaved(id, user.id);
        // bool ? setNotifyMeButtonSelected(true) : setNotifyMeButtonSelected(false);
      };
  
      isSaved();
    }, []);
  
    if (notifyMeButtonSelected)
      return (
        <TouchableOpacity onPress={handleNotifyMeButtonPress}>
          <MaterialIcons name="notifications-active" size={26} color="black" />
        </TouchableOpacity>
      );
  
    return (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}>
        {loading && <ActivityIndicator size="small" color="gray" />}
        <TouchableOpacity onPress={handleNotifyMeButtonPress}>
          <MaterialIcons name="notifications-off" size={26} color="gray" />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default React.memo(NotifyMeButton);
  