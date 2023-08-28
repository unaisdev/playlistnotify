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
import Layout from '@app/features/commons/layout/Layout';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();
  const {t} = useTranslation();

  if (!user) return;

  return (
    <Layout style={[styles.container]}>
      <Text
        style={{
          fontSize: 12,
        }}>
        {t('profile.desc_text')}
      </Text>

      <SavedSpotifyLists
        text={t('profile.your_lists')}
        playlists={userPlaylists?.filter(item =>
          item.owner.display_name.includes(user.display_name),
        )}
        isLoadingData={isLoading}
      />

      <SavedSpotifyLists
        text={t('profile.liked_lists')}
        playlists={userPlaylists?.filter(
          item => !item.owner.display_name.includes(user.display_name),
        )}
        isLoadingData={isLoading}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
