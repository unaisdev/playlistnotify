import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {usePlaylist} from '../../../../screens/playlist/components/TrackList/hooks/usePlaylist';
import {useTrackList} from '../../../../screens/playlist/components/TrackList/hooks/useTrackList';
import {useNotifyMeButton} from './hooks/useNotifyMeButton';

type Props = {
  id: string;
};

const NotifyMeButton = ({id}: Props) => {
  const {
    isSaved,
    loading,
    iconProps,
    canSavePlaylist,
    checkPlaylistForNotify,
    togglePlaylistSave,
  } = useNotifyMeButton(id);

  useEffect(() => {
    checkPlaylistForNotify();
  }, []);

  return (
    <View style={styles.inline}>
      {loading && <ActivityIndicator size="small" color="gray" />}
      <TouchableOpacity onPress={togglePlaylistSave} disabled={canSavePlaylist}>
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
    height: 30,
    gap: 8,
  },
});

export default React.memo(NotifyMeButton);
