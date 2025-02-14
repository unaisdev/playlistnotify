import {RefObject, useMemo, useRef, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from 'react-native-reanimated';

import Monicon from '@monicon/native';

type Props = {
  searchPhrase: string;
  isLoading: boolean;
  isFetching: boolean;
  inputRef: RefObject<TextInput>;
  handleSearchTextChange: (text: string) => void;

  handleBlur: () => void;
  handleClear: () => void;
  handleFocus: () => void;
};

const SearchBar = ({
  handleSearchTextChange,
  isFetching,
  isLoading,
  handleBlur,
  handleClear,
  handleFocus,
  inputRef,
  searchPhrase,
}: Props) => {
  const {t} = useTranslation();

  const userHasTypedOnInput = searchPhrase ? searchPhrase?.length > 0 : false;

  return (
    <TouchableOpacity
      style={styles.searchBarContainer}
      onPress={handleFocus}
      activeOpacity={1}>
      <Animated.View layout={Layout.duration(600)} style={styles.searchBar}>
        {isFetching ? (
          <Animated.View
            entering={FadeInLeft.duration(300)}
            exiting={FadeOutLeft.duration(300)}
            style={{marginRight: 12}}>
            <ActivityIndicator size={'small'} color={'gray'} />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeInLeft.duration(300)}
            exiting={FadeOutLeft}
            style={{marginRight: 12}}>
            <Monicon name="mdi:search" size={20} color="white" />
          </Animated.View>
        )}

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={t('search.input_placeholder')}
          value={searchPhrase}
          onChangeText={handleSearchTextChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor="#d3d3d3"
        />
        {userHasTypedOnInput && (
          <TouchableOpacity onPress={handleClear}>
            <Monicon
              name="material-symbols:close-rounded"
              size={16}
              color={'white'}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'red',
  },
  searchBar: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 13,
    color: '#fff',
    flexGrow: 1,
  },
});

export default SearchBar;
