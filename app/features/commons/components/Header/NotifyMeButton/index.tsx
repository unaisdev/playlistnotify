import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {Monicon} from '@monicon/native';

import {useNotifyMeButton} from './hooks/useNotifyMeButton';

type Props = {
  id: string;
};

const NotifyMeButton = ({id}: Props) => {
  const {
    loadingToggle,
    canSavePlaylist,
    iconProps,
    togglePlaylistSave,
    checkingSaved,
  } = useNotifyMeButton(id);

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
        <Monicon name={iconProps.iconName} size={26} color={iconProps.color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    gap: 8,
  },
});

export default React.memo(NotifyMeButton);
