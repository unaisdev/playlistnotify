import React, {useMemo} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import SavedSpotifyLists from './components/SavedSpotifyLists';

import {PlaylistModel} from '../../services/types';

import {useUserContext} from '../../containers/userContext';
import {useEffect, useState} from 'react';
import {getUserPlaylists} from '../../services/user';
import {useProfile} from './hooks/useProfile';
import i18n from '@app/features/locales/i18next';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterLists from './components/FilterLists';
import {usePlaylist} from '@app/features/commons/hooks/usePlaylist';

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();
  const {t} = useTranslation();

  if (!user) return;

  const ownPlaylists = useMemo(() => {
    return userPlaylists?.filter(item =>
      item.owner.display_name.includes(user.display_name),
    );
  }, [userPlaylists]);

  const likedPlaylists = useMemo(() => {
    return userPlaylists?.filter(
      item => !item.owner.display_name.includes(user.display_name),
    );
  }, [userPlaylists]);

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <FilterLists />

      <Text
        style={{
          fontSize: 12,
          padding: 12,
        }}>
        {t('profile.desc_text')}
      </Text>

      <SavedSpotifyLists
        text={t('profile.your_lists')}
        playlists={ownPlaylists}
        isLoadingData={isLoading}
      />

      <SavedSpotifyLists
        text={t('profile.liked_lists')}
        playlists={likedPlaylists}
        isLoadingData={isLoading}
      />
    </Layout>
  );
};

export default ProfileScreen;
