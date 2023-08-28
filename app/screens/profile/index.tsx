import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import SavedSpotifyLists from './components/SavedSpotifyLists';

import {PlaylistModel} from '../../services/types';

import {useUserContext} from '../../containers/userContext';
import {useEffect, useState} from 'react';
import {getUserPlaylists} from '../../services/user';
import {useProfile} from './hooks/useProfile';
import i18n from '@app/features/locales/i18next';

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();

  if (!user) return;

  return (
    <View
      style={[styles.container, {backgroundColor: 'black', height: '100%'}]}>
      <View style={{padding: 12}}>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
          }}>
          {i18n.t('profile.desc_text')}
        </Text>
      </View>

      <SavedSpotifyLists
        text={i18n.t('profile.your_lists')}
        playlists={userPlaylists?.filter(item =>
          item.owner.display_name.includes(user.display_name),
        )}
        isLoadingData={isLoading}
      />

      <SavedSpotifyLists
        text={i18n.t('profile.liked_lists')}
        playlists={userPlaylists?.filter(
          item => !item.owner.display_name.includes(user.display_name),
        )}
        isLoadingData={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
