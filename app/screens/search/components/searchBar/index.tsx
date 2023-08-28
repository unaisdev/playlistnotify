import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSearch} from '../../hooks/useSearch';
import {useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

type Props = {
  handleSearchTextChange: (text: string) => void;
  isLoading: boolean;
  isFetching: boolean;
};

const SearchBar = ({handleSearchTextChange, isFetching, isLoading}: Props) => {
  const {searchPhrase, data} = useSearch();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    // Handle press logic
  };

  const handleBlur = () => {
    // Handle blur logic
  };

  const handleClear = () => {
    handleSearchTextChange('');
    inputRef.current?.blur();
    // setSearchPhrase('');
  };

  return (
    <TouchableOpacity
      style={styles.searchBarContainer}
      onPress={handlePress}
      activeOpacity={1}>
      <View style={styles.searchBar}>
        <View>
          {isFetching ? (
            <ActivityIndicator size={'small'} color={'gray'} />
          ) : (
            <MaterialIcons name="search" size={20} color="white" />
          )}
        </View>

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={t('search.input_placeholder')}
          value={searchPhrase}
          onChangeText={handleSearchTextChange}
          onBlur={handleBlur}
          onFocus={() => {}}
          placeholderTextColor="#d3d3d3"
        />
        <View>
          {data?.length === 0 && (
            <TouchableOpacity onPress={handleClear}>
              <MaterialCommunityIcons name="close" size={16} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBarContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  searchBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 13,
    color: '#fff',
    flexGrow: 1,
    marginLeft: 12,
  },
});

export default SearchBar;
