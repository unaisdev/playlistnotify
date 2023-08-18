import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNotifyMeButton} from './hooks/useNotifyMeButton';

type Props = {
  id: string;
};

const NotifyMeButton = ({id}: Props) => {
  const {
    loadingToggle,
    canSavePlaylist,
    togglePlaylistSave,
    checkingSaved,
    checkPlaylistForNotify,
  } = useNotifyMeButton(id);

  const [isSaved, setIsSaved] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const isSaved = await checkPlaylistForNotify();
      setIsSaved(isSaved ?? false);
      setLoading(false);
    };

    init();
  }, []);

  const iconProps = useMemo(() => {
    if (isSaved)
      return {
        color: 'black',
        iconName: 'notifications-active',
      };

    return {
      color: 'gray',
      iconName: 'notifications-off',
    };
  }, [isSaved]);

  if (checkingSaved)
    return (
      <ActivityIndicator style={styles.inline} size="small" color="gray" />
    );

  return (
    <View style={styles.inline}>
      {loadingToggle && <ActivityIndicator size="small" color="gray" />}
      <TouchableOpacity
        onPress={togglePlaylistSave}
        disabled={canSavePlaylist || loadingToggle}>
        <MaterialIcons
          name={iconProps.iconName}
          size={26}
          color={iconProps.color}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    gap: 8,
  },
});

export default React.memo(NotifyMeButton);
