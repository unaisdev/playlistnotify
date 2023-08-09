import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

type Props = {
  id: string;
};

const NotifyMeButton = ({id}: Props) => {
  const [notifyMeButtonSelected, setNotifyMeButtonSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { user } = useUserStore();

  // const { addPlaylistId, removePlaylistId, updatePlaylist, isPlaylistSaved } =
  //   usePlaylistsForNotifyStore();
  // const { accessToken } = useAccessTokenStore();

  const handleNotifyMeButtonPress = async () => {
    setLoading(true);
    try {
      // Llamar a las funciones asincrónas aquí

      //   !notifyMeButtonSelected
      //     ? await addPlaylistId(id, user.id, accessToken)
      //     : await removePlaylistId(id, user.id);
      // Actualizar el estado notifyMeButtonSelected
      setNotifyMeButtonSelected(previousState => !previousState);
    } catch (error) {
      console.log('Error:', error);
      // Mostrar un mensaje de error en caso de que algo salga mal
    } finally {
      setLoading(false);
    }
    setLoading(true);
  };

  const color = useMemo(() => {
    if (notifyMeButtonSelected) return 'black';

    return 'gray';
  }, [notifyMeButtonSelected]);

  const iconName = useMemo(() => {
    if (notifyMeButtonSelected) return 'notifications-active';

    return 'notifications-off';
  }, []);

  useEffect(() => {
    const isSaved = async () => {
      // const bool = await isPlaylistSaved(id, user.id);
      // bool ? setNotifyMeButtonSelected(true) : setNotifyMeButtonSelected(false);
    };

    isSaved();
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        gap: 8,
      }}>
      {loading && <ActivityIndicator size="small" color="gray" />}
      <TouchableOpacity onPress={handleNotifyMeButtonPress}>
        <MaterialIcons name={iconName} size={26} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(NotifyMeButton);